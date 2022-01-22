const Formater = require("../helpers/Formater");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Music = require('../models/Music');
const MusicPlaylist = require('../models/MusicPlaylist');
const Validator = require('../helpers/Validator');
const { image } = require("../config/multer");
const multer = require("multer");
const FileReader = require("../helpers/FileReader");

class PlaylistController {
    
    uploadFile(req, res, next) {
        const upload =  multer(image).fields([{name: "icon"}]); 

        upload(req, res, function (err) {
             if (err instanceof multer.MulterError) {
                  return res.status(500).json({status: -1, code: 400, message: err.message});
             } else if (err) {
                  return res.status(500).json({status: -1, code: 400, message: err.message});
             }
            next();
        })
    }

    async store(req, res){
        try{
            let {name, description} = req.body; 

            if(!req.files.icon) throw { message: `icon must be passed`, status: -1, code: 400 };
            
            Validator.validateString(name, [0, 255], 'name');
            Validator.validateString(description, [0, 255], 'description');

            req.body.icon = req.files.icon[0].path;
            req.body.userId = req.user.id;
            
            const playlist = await Playlist.create(req.body);
            return res.json(playlist);
        }catch(error){
            if(req.files) FileReader.remove(req.files);
            return res.status(500).json(error);
        }
    }

    async show(req, res){
        try{
            let playlist = await Playlist.findAll({
                attributes: [`name`, `description`, `icon`, `userId`, `createdAt`, `updatedAt`],   
                include: [
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
            const {musicId, playlistId} = req.body;
            
            Validator.validateNumber(musicId, false, "musicId");
            Validator.validateNumber(playlistId, false, "playlistId");
            
            const music = await Music.findByPk(musicId);
            
            if(!music){
                throw {status: -1, message: `music didn't find`}
            }else{
                if(!req.user.playlist.includes(playlistId)){
                    throw {status: -1, message: `the user is not allowed to add to this playlist`}
                } 
                
                const relation = {
                    musicId: musicId,
                    playlistId: playlistId,
                }
    
                const musicPlaylist = await MusicPlaylist.create(relation);

                return res.json({status: 1, message: "Success in association"});
            }
        }catch(error){
            return res.status(500).json(error);    
        }
    }

}

module.exports = new PlaylistController();