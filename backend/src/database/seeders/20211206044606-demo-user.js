'use strict';
const Encrpyt = require("../../helpers/Encrpyt");

module.exports = {
     up: async (queryInterface, Sequelize) => {
          
          await queryInterface.bulkInsert('Users', [{
               name: 'Euterpe',
               icon: 'euterpe.jpeg',
               username: 'euterpe',
               password: await Encrpyt.encrypt('123456'),
               email: 'euterpe@euterpe.com',
               age: 21,
               birthdate: new Date(2001, 3, 4).toISOString().slice(0,10),
               createdAt: new Date(),
               updatedAt: new Date()
          }], {});

          await queryInterface.bulkInsert('Artists', [{
               name: 'Ariana Grande',
               icon: 'ariana.jpeg',
               followers: 894546412,
               description: 'biggest star in the world.',
               cover: 'cover/ariana.jpeg',
               createdAt: new Date(),
               updatedAt: new Date()
          }], {});

          await queryInterface.bulkInsert('Albums', [{
               name: 'Sweetener',
               gender: 'POP/R&B',
               artistId: 1,
               tracks: 12,
               cover: 'sweetener.jpeg',
               time: 2700000,
               createdAt: new Date(),
               updatedAt: new Date()
          }], {});

          await queryInterface.bulkInsert('Music', [{
               name: 'Sweetener',
               src: 'sweetener.m4a',
               credits: 'POP/R&B',
               time: 180000,
               gender: 'POP/R&B',
               createdAt: new Date(),
               updatedAt: new Date()
          }], {});

          await queryInterface.bulkInsert('Playlists', [{
               name: 'This is Ariana Grande',
               description: 'best from ariana',
               icon: 'ariana.jpeg',
               userId: 1,
               artistId: 1,
               createdAt: new Date(),
               updatedAt: new Date()
          }], {});

          await queryInterface.bulkInsert('MusicPlaylists', [{
               playlistId: 1,
               musicId: 1,
               createdAt: new Date(),
               updatedAt: new Date()
          }], {});

          await queryInterface.bulkInsert('MusicAlbums', [{
               albumId: 1,
               musicId: 1,
               createdAt: new Date(),
               updatedAt: new Date()
          }], {});

          await queryInterface.bulkInsert('AlbumUsers', [{
               albumId: 1,
               userId: 1,
               createdAt: new Date(),
               updatedAt: new Date()
          }], {});

     },

     down: async (queryInterface, Sequelize) => {
          await queryInterface.bulkDelete('Users', null, {});
          await queryInterface.bulkDelete('Artists', null, {});
          await queryInterface.bulkDelete('Albums', null, {});
          await queryInterface.bulkDelete('Music', null, {});
          await queryInterface.bulkDelete('Playlists', null, {});
          await queryInterface.bulkDelete('MusicPlaylists', null, {});
          await queryInterface.bulkDelete('MusicAlbums', null, {});
          await queryInterface.bulkDelete('AlbumUsers', null, {});
     }
};
