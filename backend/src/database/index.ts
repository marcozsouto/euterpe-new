import { Sequelize } from "sequelize"

import config from "../config/database"

import User from "../models/User"
import Artist from "../models/Artist"
import Playlist from "../models/Playlist"
import Music from "../models/Music"
import Album from "../models/Album"
import MusicPlaylist from "../models/MusicPlaylist"
import MusicAlbum from "../models/MusicAlbum"
import AlbumUser from "../models/AlbumUser"
import ArtistUser from "../models/ArtistUser"

const models: any = [
     User,
     Artist,
     Playlist,
     Music,
     Album,
     MusicPlaylist,
     MusicAlbum,
     AlbumUser,
     ArtistUser,
]

class Database {
     public connection!: Sequelize

     constructor() {
          this.init()
     }

     init(): void {
          this.connection = new Sequelize(config)

          models
               .map((model: any) =>
                    model.init(model.attributes(), {
                         sequelize: this.connection,
                    })
               )
               .map((model: any) => {
                    if (model.associate) model.associate(this.connection.models)
                    return model
               })
     }
}

const database: Database = new Database()

export default database
