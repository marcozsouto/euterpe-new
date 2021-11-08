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
}

module.exports = new ArtistController();