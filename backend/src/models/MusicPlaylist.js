const Sequelize = require('sequelize');

class MusicPlaylist extends Sequelize.Model {
    static init(sequelize){
        super.init(
            {
                idMusic: Sequelize.INTEGER,
                idPlaylist: Sequelize.INTEGER,
            },
            {
                sequelize
            }
        );
        return this;
    }    
}

module.exports = MusicPlaylist;