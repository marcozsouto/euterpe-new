"use strict"
module.exports = {
     up: async (queryInterface, Sequelize) => {
          await queryInterface.createTable("Playlists", {
               id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
               },
               name: {
                    type: Sequelize.STRING,
                    allowNull: false,
               },
               description: {
                    type: Sequelize.STRING,
               },
               icon: {
                    type: Sequelize.STRING,
               },
               userId: {
                    type: Sequelize.INTEGER,
                    references: { model: "Users", key: "id" },
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL",
               },
               artistId: {
                    type: Sequelize.INTEGER,
                    references: { model: "Artists", key: "id" },
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL",
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
          await queryInterface.dropTable("Playlists")
     },
}
