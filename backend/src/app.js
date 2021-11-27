const express = require('express')
const routes = require('./routes')
var cors = require('cors');
const icons = express.static('images');
const bodyParser = require("body-parser");

class App {
    constructor() {
        this.server = express();
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(bodyParser.json());
        this.server.use('/icon',icons)
        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.routes();
    }

    routes() {
        this.server.use(routes)
        
    }
}

module.exports = new App().server;