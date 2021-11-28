const Sequelize = require('sequelize');
const Artist = require('../models/Artist');
const User = require('../models/User');
const databaseConfig = require('../config/database');
const Playlist = require('../models/Playlist');

const models = [Artist, User, Playlist];

class Database{
     constructor(){
          this.init();
     }

     init(){
          this.connection = new Sequelize(databaseConfig);
          models.map((model) => model.init(this.connection))
            .map((model) => {
                if(model.associate) model.associate(this.connection.models);
                return model;
            })
     }
}

module.export = new Database();