const Sequelize = require('sequelize');

class AlbumUser extends Sequelize.Model {
     static init(sequelize){
          super.init(
               {
                    albumId: Sequelize.INTEGER,
                    userId: Sequelize.INTEGER
               },
               {
                    sequelize
               }
          );
          return this;
     }    
}

module.exports = AlbumUser;