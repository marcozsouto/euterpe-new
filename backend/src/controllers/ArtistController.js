const FileReader = require('../helpers/FileReader');
const Validator = require('../helpers/Validator');
const Artist = require('../models/Artist');

class ArtistController {
     
     async store(req, res){
          
          const artist = await Artist.create(req.body);
          return res.json(artist);
     }

     async index(req, res){
          const artists = await Artist.findAll();
          return res.json(artists);
     }

     async random(req, res){
          try{
               const { amount } = req.body;
               
               Validator.validateNumber(amount, false, "amount");
               let images = await FileReader.filesAt('images');

               let result = [];
               
               while(result.length != images.length){
                    let random = images[Math.floor(Math.random()*images.length)];
                    if(!result.includes(random)){
                         result.push(random);
                    }
               }
               while(result.length != amount){
                    result.push( images[Math.floor(Math.random()*images.length)]);
               }

               result = result.map(e=> `${process.env.BASE_URL}icon/${e}`);
               return res.json({status: 1, result});
          }catch(error){
               return res.status(500).json(error)
          }
     }
}

module.exports = new ArtistController();