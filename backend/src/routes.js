const { Router } = require('express');
require('dotenv/config');
require('./database');
const routes = new Router();
const ArtistController = require('./controllers/ArtistController');
const PlaylistController = require('./controllers/PlaylistController');
const UserController = require('./controllers/UserController');
const Auth = require('./models/Auth');

//Rotas Playlist
routes.post('/playlist/store', Auth.authorization, PlaylistController.uploadFile, PlaylistController.store);
routes.get('/playlists', Auth.authorization, PlaylistController.show);
routes.post('/playlist/add/music', Auth.authorization, PlaylistController.addToPlaylist);

//Rotas Artist
routes.post('/artist/store', Auth.authorization, ArtistController.uploadFile, ArtistController.store);
routes.get('/artists',Auth.authorization, ArtistController.show);
routes.post('/artist/update', Auth.authorization, ArtistController.update);

// Rotas de Usuario
routes.post('/login', UserController.login);
routes.post('/signup', UserController.uploadFile, UserController.signup);
routes.get('/user/playlists', Auth.authorization, UserController.userPlaylists);
routes.get('/user/artists', Auth.authorization, UserController.userArtists);

routes.get('/', (req, res) => {res.send({message: "Hello you're connected to euterpe API"})})

module.exports = routes;