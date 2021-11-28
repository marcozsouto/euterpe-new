const Sequelize = require('sequelize');

class Playlist extends Sequelize.Model {
  static init(sequelize){
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        icon: Sequelize.STRING,
        user_id: Sequelize.INTEGER
      },
      {
        sequelize
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id', 
      as: 'user'
    });
  }

}

module.exports = Playlist;