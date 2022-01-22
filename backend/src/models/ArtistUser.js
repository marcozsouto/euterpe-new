const Sequelize = require('sequelize');

class ArtistUser extends Sequelize.Model {
     static init(sequelize){
          super.init(
               {
                    artistId: Sequelize.INTEGER,
                    userId: Sequelize.INTEGER
               },
               {
                    sequelize
               }
          );
          return this;
     }    
}

module.exports = ArtistUser;