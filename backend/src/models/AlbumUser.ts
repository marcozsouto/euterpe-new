import { Model, DataTypes } from "sequelize"

export default class AlbumUser extends Model {
     static attributes = () => {
          return {
               albumId: DataTypes.INTEGER,
               userId: DataTypes.INTEGER,
          }
     }
}
