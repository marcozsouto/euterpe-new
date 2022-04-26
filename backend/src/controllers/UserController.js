const Encrpyt = require("../helpers/Encrpyt");
const Validator = require("../helpers/Validator");
const User = require("../models/User");
const Playlist = require("../models/Playlist");
const jwt = require('jsonwebtoken');
const { Op  } = require("sequelize");
const Formater = require("../helpers/Formater");
const Music = require("../models/Music");
const multer = require("multer");
const { image } = require("../config/multer");
const Album = require("../models/Album");
const Artist = require("../models/Artist");

class UserController {
     
    async login(req, res){
        try{
            Validator.validateString(req.body.login, [0, 255], "login");
            Validator.validateString(req.body.password, [0, 255], "password");

            let user = await User.findAll({
                where: {
                    [Op.or]: [
                      { username:  req.body.login},
                      { email: req.body.login}
                    ]
                },
                include: [
                    {model: Playlist, as: "playlist", attributes: ['id']}
                ],
                nest: true
            });
            
            user = user.map((team) => team.get({ plain: true }));

            if(user.length == 1){ 
                user = user[0];
                user.playlist = user.playlist.map(x => x.id);
                if(await Encrpyt.compare(req.body.password, user.password)){
                    const token = jwt.sign(user, process.env.SECRET, {expiresIn: "24h"});
                    return res.json({status: 1, token: token});
                }
                throw { message: `password incorrect`, status: -1, code: 400 }
            } 
            
            throw { message: `login doesn't exist`, status: -1, code: 400 };
            
        }catch(error){
            console.error(error);
            return res.status(500).json(error);
        }
    }

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

    async signup(req, res){
        try{
            Validator.validateString(req.body.name, [0, 255], "name");
            if(!req.files.icon) throw { message: `icon must be passed`, status: -1, code: 400 };
            Validator.validateString(req.body.username, [0, 255], "username");
            Validator.validateString(req.body.password, [0, 255], "password");
            Validator.validateString(req.body.email, [0, 255], "email");
            Validator.validateNumber(req.body.age, [0, 110], "age");
            Validator.validateDate(req.body.birthdate, "birthdate");
            
            req.body.status = "activated";
            req.body.password = await Encrpyt.encrypt(req.body.password);
            req.body.icon = req.files.icon[0].path;

            const user = await User.create(req.body);
            return res.json({status: 1, user});
        }catch(error){
            if(req.files) FileReader.remove(req.files);
            return res.status(500).json(error);
        }
    }

    async userPlaylists(req, res){
        try{
            let playlist = await Playlist.findAll({
                attributes: [`name`, `description`, `icon`, `userId`, `createdAt`, `updatedAt`],   
                where: {userId: req.user.id}, 
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

    async userArtists(req, res){
        try{
            let {albums, musics} = req.query

            let include = albums == 'true' ? [{
                model: Album, 
                as: "albums", 
                attributes: ['id', 'name', 'gender', 'tracks', 'cover', 'time', 'date'],
                include:  musics == 'true' &&  albums == 'true' ? [{
                    model: Music,  
                    as: "musics", 
                    attributes: ['id', 'name', 'src', 'credits', 'time', 'gender'], 
                    through: {attributes: []}
                }] : []
            }] : [];
        
            include.push(
                {
                    model: User,
                    as: 'users',
                    attributes: [],
                    through: {attributes: []},
                    where: {userId: req.user.id}, 
                }
            );

            let artists = await Artist.findAll({
                 attributes: [`id`,`name`, `description`, `icon`, `followers`, `cover`],   
                 include: include,
                 nest: true
            });
            artists = artists.map((team) => team.get({ plain: true }));

            artists = artists.map(p => { return {
                 ...p, 
                 albums: albums == 'true' ? p.albums.map(pi => { return {
                      ...pi,
                      time: Formater.formatarTime(pi.time),
                      date: Formater.formatarDateNew(pi.date),
                 }}) : []
            }});

            return res.json(artists);
        }catch(error){
            return res.status(500).json(error);
        }  
    }

}

module.exports = new UserController();