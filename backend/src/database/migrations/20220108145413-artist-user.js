"use strict"
module.exports = {
     up: async (queryInterface, Sequelize) => {
          await queryInterface.createTable("ArtistUsers", {
               id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
               },
               artistId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: "Artists", key: "id" },
                    onDelete: "CASCADE",
               },
               userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: { model: "Users", key: "id" },
                    onDelete: "CASCADE",
               },
               createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
               },
               updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
               },
          })
     },
     down: async (queryInterface, Sequelize) => {
          await queryInterface.dropTable("AlbumUsers")
     },
}
