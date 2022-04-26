const Sequelize = require('sequelize');

class Music extends Sequelize.Model {
     static init(sequelize){
          super.init(
               {
                    name: Sequelize.STRING,
                    src: Sequelize.STRING,
                    credits: Sequelize.TEXT,
                    time: Sequelize.NUMBER,
                    gender: Sequelize.TEXT,
               },
               {
                    sequelize
               }
          );

          return this;
     }

     static associate(models) {
          this.belongsToMany(models.Playlist, { through: 'MusicPlaylists',  as: "playlists", foreignKey: "musicId"});

          this.belongsToMany(models.Album, { through: 'MusicAlbums',  as: "albums", foreignKey: "musicId"});
     }

}

module.exports = Music;