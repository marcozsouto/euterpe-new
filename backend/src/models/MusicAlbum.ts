import { Model, DataTypes } from "sequelize"

export default class MusicAlbum extends Model {
     static attributes = () => {
          return {
               albumId: DataTypes.INTEGER,
               musicId: DataTypes.INTEGER,
          }
     }
}
