const Sequelize = require('sequelize');

class Playlist extends Sequelize.Model {
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                description: Sequelize.STRING,
                icon: Sequelize.STRING,
                userId: Sequelize.INTEGER,
                artistId: Sequelize.INTEGER,
            },
            {
                sequelize
            }
        );
        return this;
    }
    
    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'userId', 
            as: 'user'
        });

        this.belongsTo(models.Artist, {
            foreignKey: 'artistId', 
            as: 'artist'
        });

        this.belongsToMany(models.Music, { through: 'MusicPlaylists',  as: "musics", foreignKey: "playlistId" });
    }

}

module.exports = Playlist;