import { Model, DataTypes } from "sequelize"

export default class ArtistUser extends Model {
     static attributes = () => {
          return {
               artistId: DataTypes.INTEGER,
               userId: DataTypes.INTEGER,
          }
     }
}
