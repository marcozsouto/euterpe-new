const Artist = require('../models/Artist');

class MusicController {
     
    async store(req, res){
        try{
            const artist = await Artist.create(req.body);
            return res.json(artist);
        }catch(error){
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

}

module.exports = new MusicController();