import { Model, DataTypes } from "sequelize"

export default class Music extends Model {
     static attributes = () => {
          return {
               name: DataTypes.STRING,
               src: DataTypes.STRING,
               credits: DataTypes.TEXT,
               time: DataTypes.NUMBER,
               gender: DataTypes.TEXT,
          }
     }

     static associate(models: any) {
          this.belongsToMany(models.Playlist, {
               through: "MusicPlaylists",
               as: "playlists",
               foreignKey: "musicId",
          })

          this.belongsToMany(models.Album, {
               through: "MusicAlbums",
               as: "albums",
               foreignKey: "musicId",
          })
     }
}
