const Sequelize = require('sequelize');

class Album extends Sequelize.Model {
     static init(sequelize){
          super.init(
               {
                    name: Sequelize.STRING,
                    gender: Sequelize.STRING,
                    artistId: Sequelize.INTEGER,
                    tracks: Sequelize.INTEGER,
                    cover: Sequelize.STRING,
                    time: Sequelize.INTEGER
               }, 
               {
                    sequelize
               }
          );

          return this;
     }

     static associate(models) {
          this.belongsTo(models.Artist, {
              foreignKey: 'artistId', 
              as: 'artist'
          });

          this.belongsToMany(models.Music, { through: 'MusicAlbums',  as: "musics", foreignKey: "albumId" });

          this.belongsToMany(models.User, { through: 'AlbumUsers',  as: "users", foreignKey: "albumId" });

     }
}

module.exports = Album;