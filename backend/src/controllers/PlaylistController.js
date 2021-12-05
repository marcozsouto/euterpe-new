const Formater = require("../helpers/Formater");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Music = require('../models/Music');
const MusicPlaylist = require('../models/MusicPlaylist');
const Validator = require('../helpers/Validator');

class PlaylistController {
     
    async store(req, res){
    try{
        let {name, description, icon} = req.body; 
        
        Validator.validateString(name, [0, 255], 'name');
        Validator.validateString(description, [0, 255], 'description');
        Validator.validateString(icon, [0, 255], 'icon');
        req.body.userId = req.user.id;
        
        console.log(req.body);
        const playlist = await Playlist.create(req.body);
        return res.json(playlist);
    }catch(error){
        return res.status(500).json(error);
    }

    }

    async show(req, res){
        try{
            let playlist = await Playlist.findAll({
                attributes: [`name`, `description`, `icon`, `userId`, `createdAt`, `updatedAt`],   
                where: {UserId: req.user.id}, 
                include: [
                    {model: User, as: "user", attributes: ['name', 'username']}, 
                    {model: Music, as: "musics", attributes: ['id', 'name', 'src', 'time'], through: {attributes: []}}
                ],
                nest: true
            });
            playlist = playlist.map((team) => team.get({ plain: true }));
    
            playlist = playlist.map(p => { return {
                ...p, 
                createdAt: Formater.formatarDateNew(p.createdAt), 
                updatedAt: Formater.formatarDateNew(p.updatedAt)
            }});

            return res.json(playlist);
        }catch(error){
            return res.status(500).json(error);
        }
    }

    async addToPlaylist(req, res){
        try{
            const {idMusic, idPlaylist} = req.body;
            
            Validator.validateNumber(idMusic, false, "idMusic");
            Validator.validateNumber(idPlaylist, false, "idPlaylist");
            
            
            const music = await Music.findByPk(idMusic);
            
            if(!music){
                throw {status: -1, message: `music didn't find`}
            }else{
                if(!req.user.playlist.includes(idPlaylist)){
                    throw {status: -1, message: `the user is not allowed to add to this playlist`}
                } 
                
                const relation = {
                    idMusic: idMusic,
                    idPlaylist: idPlaylist,
                }
    
                const musicPlaylist = await MusicPlaylist.create(relation);

                return res.json({status: 1, message: "Sucess in association"});
            }
        }catch(error){
            return res.status(500).json(error);    
        }
    }

}

module.exports = new PlaylistController();