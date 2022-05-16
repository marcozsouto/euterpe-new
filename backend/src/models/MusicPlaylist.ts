import { Model, DataTypes } from "sequelize"

export default class MusicPlaylist extends Model {
     static attributes = () => {
          return {
               musicId: DataTypes.INTEGER,
               playlistId: DataTypes.INTEGER,
          }
     }
}
