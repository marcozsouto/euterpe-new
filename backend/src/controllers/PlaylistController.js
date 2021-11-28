const Playlist = require("../models/Playlist");


class PlaylistController {
     
     async store(req, res){
        try{
            req.body.user_id = req.user.id;
            console.log(req.body);
            const playlist = await Playlist.create(req.body);
            return res.json(playlist);
        }catch(error){
            return res.status(500).json(error);
        }

     }

    async show(req, res){
        try{
            const playlist = await Playlist.findAll({
                where: {
                    UserId: req.user.id
                }
              });
            return res.json(playlist);
        }catch(error){
            return res.status(500).json(error);
        }
    }

}

module.exports = new PlaylistController();