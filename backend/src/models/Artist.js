const Sequelize = require('sequelize');

class Artist extends Sequelize.Model {
     static init(sequelize){
          super.init(
               {
                    name: Sequelize.STRING,
                    icon: Sequelize.STRING,
                    followers: Sequelize.INTEGER,
                    description: Sequelize.STRING,
                    cover: Sequelize.STRING,
               },
               {
                    sequelize
               }
          );

          return this;
     }
}

module.exports = Artist;