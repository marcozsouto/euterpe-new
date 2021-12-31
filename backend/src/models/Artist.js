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

     static associate(models) {
          this.hasMany(models.Playlist, {as: 'playlist'});
     }
}

module.exports = Artist;