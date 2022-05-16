import Playlist from "../models/Playlist"
import Music from "../models/Music"
import MusicPlaylist from "../models/MusicPlaylist"

import FileReader from "../helpers/FileReader"
import Formater from "../helpers/Formater"

export default class PlaylistService {
     static async showAll() {
          try {
               let playlists: any = await Playlist.findAll({
                    attributes: [
                         `name`,
                         `description`,
                         `icon`,
                         `userId`,
                         `createdAt`,
                         `updatedAt`,
                    ],
                    include: [
                         {
                              model: Music,
                              as: "musics",
                              attributes: ["id", "name", "src", "time"],
                              through: { attributes: [] },
                         },
                    ],
                    nest: true,
               })
               playlists = playlists.map((team: any) =>
                    team.get({ plain: true })
               )

               playlists = playlists.map((p: any) => {
                    return {
                         ...p,
                         createdAt: Formater.formatarDateNew(p.createdAt),
                         updatedAt: Formater.formatarDateNew(p.updatedAt),
                    }
               })

               return playlists
          } catch (err: any) {
               throw { status: "error", code: 400, message: err.message }
          }
     }

     static async store(data: any) {
          try {
               if (!data.files.icon) throw { message: "invalid icon passed" }

               const info: any = {
                    name: data.name,
                    description: data.description,
                    icon: data.files.icon[0].path,
                    userId: data.userId,
               }

               await Playlist.create(info)

               return 1
          } catch (err: any) {
               if (data.files) FileReader.remove(data.files)
               throw { status: "error", code: 400, message: err.message }
          }
     }

     static async addMusic(musicId: number, playlistId: number, user: any) {
          try {
               const music: any = await Music.findByPk(musicId)

               if (!music) {
                    throw { message: `music didn't find` }
               } else {
                    if (!user.playlist.includes(playlistId)) {
                         throw {
                              message: `the user is not allowed to add to this playlist`,
                         }
                    }

                    const relation: any = {
                         musicId: musicId,
                         playlistId: playlistId,
                    }

                    await MusicPlaylist.create(relation)

                    return 1
               }
          } catch (err: any) {
               throw { status: "error", code: 400, message: err.message }
          }
     }
}
