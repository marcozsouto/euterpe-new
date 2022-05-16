import { Model, DataTypes } from "sequelize"

export default class User extends Model {
     static attributes = () => {
          return {
               name: DataTypes.STRING,
               icon: DataTypes.STRING,
               username: DataTypes.STRING,
               password: DataTypes.STRING,
               email: DataTypes.STRING,
               age: DataTypes.NUMBER,
               birthdate: DataTypes.DATEONLY,
               status: {
                    type: DataTypes.ENUM,
                    values: ["activated", "disabled"],
               },
          }
     }

     static associate(models: any) {
          this.hasMany(models.Playlist, { as: "playlist" })
          this.belongsToMany(models.Album, {
               through: "AlbumUsers",
               as: "albums",
               foreignKey: "userId",
          })
          this.belongsToMany(models.Artist, {
               through: "ArtistUsers",
               as: "artists",
               foreignKey: "userId",
          })
     }
}
