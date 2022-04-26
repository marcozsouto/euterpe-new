'use strict';
module.exports = {
     up: async (queryInterface, Sequelize) => {
          await queryInterface.createTable('MusicAlbums', {
               id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
               },
               albumId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: 'Albums', key: 'id' },
                    onDelete: 'CASCADE',
               },
               musicId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: 'Music', key: 'id' },
                    onDelete: 'CASCADE',
               },
               createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
               },
               updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
               }
          });
     },
     down: async (queryInterface, Sequelize) => {
          await queryInterface.dropTable('MusicAlbums');
     }
};