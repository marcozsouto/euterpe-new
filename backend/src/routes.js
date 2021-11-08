const { Router } = require('express')
require('./database');

const routes = new Router();
const ArtistController = require('./controllers/ArtistController');

routes.post('/artists', ArtistController.store);
routes.get('/artists', ArtistController.index);
routes.get('/', (req, res) => {res.send({message: "Hello you're connected"})})

module.exports = routes;