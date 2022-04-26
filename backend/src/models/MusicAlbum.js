const Sequelize = require('sequelize');

class MusicAlbum extends Sequelize.Model {
     static init(sequelize){
          super.init(
               {
                    albumId: Sequelize.INTEGER,
                    musicId: Sequelize.INTEGER
               },
               {
                    sequelize
               }
          );
          return this;
     }    
}

module.exports = MusicAlbum;