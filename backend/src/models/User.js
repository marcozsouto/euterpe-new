const Sequelize = require('sequelize');

class User extends Sequelize.Model {
     static init(sequelize){
          super.init(
               {
                    name: Sequelize.STRING,
                    icon: Sequelize.STRING,
                    username: Sequelize.STRING,
                    password: Sequelize.STRING,
                    email: Sequelize.STRING,
                    age: Sequelize.NUMBER,
                    birthdate: Sequelize.DATEONLY,
                    status: {
                         type: Sequelize.ENUM,
                         values: ["activated", "disabled"]
                    },
               },
               {
                    sequelize
               }
          );

          return this;
     }

     static associate(models) {
          this.hasMany(models.Playlist, {as: 'playlist'});

          this.belongsToMany(models.Album, { through: 'AlbumUsers',  as: "albums", foreignKey: "userId" });
     }

}

module.exports = User;