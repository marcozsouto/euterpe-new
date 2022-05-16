import { Model, DataTypes } from "sequelize"

export default class Album extends Model {
     static attributes = () => {
          return {
               name: DataTypes.STRING,
               gender: DataTypes.STRING,
               artistId: DataTypes.INTEGER,
               tracks: DataTypes.INTEGER,
               cover: DataTypes.STRING,
               time: DataTypes.INTEGER,
          }
     }

     static associate(models: any) {
          this.belongsTo(models.Artist, {
               foreignKey: "artistId",
               as: "artist",
          })

          this.belongsToMany(models.Music, {
               through: "MusicAlbums",
               as: "musics",
               foreignKey: "albumId",
          })

          this.belongsToMany(models.User, {
               through: "AlbumUsers",
               as: "users",
               foreignKey: "albumId",
          })
     }
}
