'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MusicPlaylists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idPlaylist: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Playlists', key: 'id' },
        onDelete: 'CASCADE',
      },
      idMusic: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Music', key: 'id' },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MusicPlaylists');
  }
};