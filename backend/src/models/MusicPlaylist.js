const Sequelize = require('sequelize');

class MusicPlaylist extends Sequelize.Model {
    static init(sequelize){
        super.init(
            {
                musicId: Sequelize.INTEGER,
                playlistId: Sequelize.INTEGER,
            },
            {
                sequelize
            }
        );
        return this;
    }    
}

module.exports = MusicPlaylist;