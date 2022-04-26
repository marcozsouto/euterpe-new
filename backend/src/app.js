const express = require('express')
const routes = require('./routes')
var cors = require('cors');
const icons = express.static('images');
const path = require("path");

class App {
    constructor() {
        this.server = express();
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(cors());
        this.server.use("/files",  express.static(path.resolve(__dirname, "..", "tmp", "uploads")));
        this.server.use('/icon',icons)
        this.routes();
    }

    routes() {
        this.server.use(routes)
    }
}

module.exports = new App().server;