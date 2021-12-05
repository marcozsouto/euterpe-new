const Sequelize = require('sequelize');

class Playlist extends Sequelize.Model {
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                description: Sequelize.STRING,
                icon: Sequelize.STRING,
                userId: Sequelize.INTEGER
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

        this.belongsToMany(models.Music, { through: 'MusicPlaylists',  as: "musics", foreignKey: "idPlaylist" });
    }

}

module.exports = Playlist;