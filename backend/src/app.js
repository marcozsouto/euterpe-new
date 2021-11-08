const express = require('express')
const routes = require('./routes')

const icons = express.static('images');


class App {
    constructor() {
        this.server = express();
        this.server.use(express.json());
        this.server.use('/icon',icons)
        this.routes();
    }

    routes() {
        this.server.use(routes)
        
    }
}

module.exports = new App().server;