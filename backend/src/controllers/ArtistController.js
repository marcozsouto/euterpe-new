const FileReader = require('../helpers/FileReader');
const Validator = require('../helpers/Validator');
const Artist = require('../models/Artist');
const multer = require("multer");
const { image } = require("../config/multer");
const Album = require('../models/Album');
const Formater = require('../helpers/Formater');
const Music = require('../models/Music');
const User = require('../models/User');

class ArtistController {
   
     uploadFile(req, res, next) {
          const upload =  multer(image).fields([{name: "icon"},{name: "cover"}]); 

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
               let { name, description } = req.body;  

               if(!req.files.icon) throw { message: `icon must be passed`, status: -1, code: 400 };
               if(!req.files.cover) throw { message: `cover must be passed`, status: -1, code: 400 };
               if(!req.files || Object.keys(req.files).length === 0) throw { message: `icon and cover must be passed`, status: -1, code: 400 }
               
               Validator.validateString(name, [0,255], `name`);
               Validator.validateString(description, [0,255], `description`);

               req.body.followers = 0;
               req.body.icon = req.files.icon[0].path;
               req.body.cover = req.files.cover[0].path;

               const artist = await Artist.create(req.body);
               return res.json(artist);
          }catch(error){
               if(req.files) FileReader.remove(req.files);
               return res.status(500).json(error);
          }

     }

     async show(req, res){
          try{
               let {albums, musics} = req.query

               let include = [
                    albums == 'true' ? {
                         model: Album, 
                         as: "albums", 
                         attributes: ['id', 'name', 'gender', 'tracks', 'cover', 'time', 'date'],
                         include:  musics == 'true' &&  albums == 'true' ? [{
                              model: Music,  
                              as: "musics", 
                              attributes: ['id', 'name', 'src', 'credits', 'time', 'gender'], 
                              through: {attributes: []}
                         }] : []
                    } : null
               ];

               let artists = await Artist.findAll({
                    attributes: [`id`,`name`, `description`, `icon`, `followers`, `cover`, `createdAt`],   
                    include:  albums == 'true' ? include : [],
                    nest: true
               });
               artists = artists.map((team) => team.get({ plain: true }));

               artists = artists.map(p => { return {
                    ...p, 
                    createdAt: Formater.formatarDateNew(p.createdAt), 
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

     async update(req, res){
          try{

          }catch(error){
              return res.status(500).json(error);
          }
     }

     async random(req, res){
          try{
               return res.json({status: 1});
          }catch(error){
               return res.status(500).json(error)
          }
     }
}

module.exports = new ArtistController();