"use strict"
module.exports = {
     up: async (queryInterface, Sequelize) => {
          await queryInterface.createTable("Albums", {
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
               gender: {
                    type: Sequelize.STRING,
                    allowNull: false,
               },
               artistId: {
                    type: Sequelize.INTEGER,
                    references: { model: "Artists", key: "id" },
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL",
               },
               tracks: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
               },
               cover: {
                    type: Sequelize.STRING,
                    allowNull: false,
               },
               time: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
               },
               date: {
                    allowNull: false,
                    type: Sequelize.DATE,
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
          await queryInterface.dropTable("Albums")
     },
}
