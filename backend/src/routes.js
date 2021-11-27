const { Router } = require('express')
require('./database');
require('dotenv/config');

const routes = new Router();
const ArtistController = require('./controllers/ArtistController');
const UserController = require('./controllers/UserController');
const Auth = require('./models/Auth');

// Rotas de Usuario
routes.post('/login', UserController.login);
routes.post('/signup', UserController.signup);



routes.post('/artists/random', ArtistController.random);
routes.post('/artists', ArtistController.store);
routes.get('/artists', ArtistController.index);
routes.get('/', (req, res) => {res.send({message: "Hello you're connected"})})

module.exports = routes;