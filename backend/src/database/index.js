const Sequelize = require('sequelize');

const Artist = require('../models/Artist');

const databaseConfig = require('../config/database');

const models = [Artist];

class Database{
     constructor(){
          this.init();
     }

     init(){
          this.connection =  new Sequelize(databaseConfig);
          models
               .map(model => model.init(this.connection))
               .map(model => model.associate && model.associate(this.connection.models))
     }
}

module.export = new Database();