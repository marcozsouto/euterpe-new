const FileReader = require('../helpers/FileReader');
const Validator = require('../helpers/Validator');
const Artist = require('../models/Artist');
const multer = require("multer");
const multerConfig = require("../config/multer");

class ArtistController {
   
     uploadFile(req, res, next) {
          const upload =  multer(multerConfig).fields([{name: "icon"},{name: "cover"}]); 

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

     async index(req, res){
          try{
               const artists = await Artist.findAll();
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
               const { amount } = req.body;
               
               Validator.validateNumber(amount, false, "amount");
               let images = await FileReader.filesAt('images');
               
               let i =0, result = [];
               
               while(i != amount){
                    let random = images[Math.floor(Math.random()*images.length)];
                    if(!result.includes(random)){
                         result.push(random);
                         i++;
                    }
               }
               
               
               if(result.length < amount){
                    while(result.length != amount){
                         result.push( images[Math.floor(Math.random()*images.length)]);
                    }
               }

               result = result.map(e=> `${process.env.BASE_URL}icon/${e}`);
               return res.json({status: 1, result});
          }catch(error){
               return res.status(500).json(error)
          }
     }
}

module.exports = new ArtistController();