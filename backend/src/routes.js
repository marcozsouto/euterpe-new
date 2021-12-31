const { Router } = require('express');
require('./database');
require('dotenv/config');
const routes = new Router();
const ArtistController = require('./controllers/ArtistController');
const PlaylistController = require('./controllers/PlaylistController');
const UserController = require('./controllers/UserController');
const Auth = require('./models/Auth');

// Rotas de Usuario
routes.post('/login', UserController.login);
routes.post('/signup', UserController.signup);

//Rotas Playlist
routes.post('/playlist', Auth.authorization, PlaylistController.store);
routes.get('/playlists', Auth.authorization, PlaylistController.show);
routes.post('/playlist/add/music', Auth.authorization, PlaylistController.addToPlaylist);

//Rotas Artist
routes.post('/artists/random', ArtistController.random);
routes.post('/artist/store', Auth.authorization, ArtistController.uploadFile, ArtistController.store);
routes.get('/artist',Auth.authorization, ArtistController.index);
routes.post('/artist/update', Auth.authorization, ArtistController.update);

routes.get('/', (req, res) => {res.send({message: "Hello you're connected"})})

module.exports = routes;