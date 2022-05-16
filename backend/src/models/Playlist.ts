import { Model, DataTypes } from "sequelize"

export default class Playlist extends Model {
     static attributes = () => {
          return {
               name: DataTypes.STRING,
               description: DataTypes.STRING,
               icon: DataTypes.STRING,
               userId: DataTypes.INTEGER,
               artistId: DataTypes.INTEGER,
          }
     }

     static associate(models: any) {
          this.belongsTo(models.User, {
               foreignKey: "userId",
               as: "user",
          })

          this.belongsTo(models.Artist, {
               foreignKey: "artistId",
               as: "artist",
          })

          this.belongsToMany(models.Music, {
               through: "MusicPlaylists",
               as: "musics",
               foreignKey: "playlistId",
          })
     }
}
