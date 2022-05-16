import { Model, DataTypes } from "sequelize"

export default class Artist extends Model {
     static attributes = () => {
          return {
               name: DataTypes.STRING,
               icon: DataTypes.STRING,
               followers: DataTypes.INTEGER,
               description: DataTypes.STRING,
               cover: DataTypes.STRING,
          }
     }

     static associate(models: any) {
          this.hasMany(models.Album, { as: "albums" })
          this.hasMany(models.Playlist, { as: "playlist" })

          this.belongsToMany(models.User, {
               through: "ArtistUsers",
               as: "users",
               foreignKey: "artistId",
          })
     }
}
