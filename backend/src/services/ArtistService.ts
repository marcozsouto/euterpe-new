import Artist from "../models/Artist"
import Music from "../models/Music"
import Album from "../models/Album"

import FileReader from "../helpers/FileReader"
import Formater from "../helpers/Formater"

export default class ArtistService {
     static async store(data: any) {
          try {
               if (!data.files.icon) throw { message: `icon must be passed` }
               if (!data.files.cover) throw { message: `cover must be passed` }
               if (!data.files || Object.keys(data.files).length === 0)
                    throw { message: `icon and cover must be passed` }

               const info: any = {
                    name: data.name,
                    description: data.description,
                    icon: data.files.icon[0].path,
                    userId: data.files.cover[0].path,
                    followers: 0,
               }

               await Artist.create(info)

               return 0
          } catch (err: any) {
               if (data.files) FileReader.remove(data.files)
               throw { status: "error", code: 400, message: err.message }
          }
     }

     static async showAll(query: any) {
          try {
               let { albums, musics } = query

               let include = [
                    albums == "true"
                         ? {
                                model: Album,
                                as: "albums",
                                attributes: [
                                     "id",
                                     "name",
                                     "gender",
                                     "tracks",
                                     "cover",
                                     "time",
                                     "date",
                                ],
                                include:
                                     musics == "true" && albums == "true"
                                          ? [
                                                 {
                                                      model: Music,
                                                      as: "musics",
                                                      attributes: [
                                                           "id",
                                                           "name",
                                                           "src",
                                                           "credits",
                                                           "time",
                                                           "gender",
                                                      ],
                                                      through: {
                                                           attributes: [],
                                                      },
                                                 },
                                            ]
                                          : [],
                           }
                         : {},
               ]

               let artists = await Artist.findAll({
                    attributes: [
                         `id`,
                         `name`,
                         `description`,
                         `icon`,
                         `followers`,
                         `cover`,
                         `createdAt`,
                    ],
                    include: albums == "true" ? include : [],
                    nest: true,
               })
               artists = artists.map((team: any) => team.get({ plain: true }))

               artists = artists.map((p: any) => {
                    return {
                         ...p,
                         createdAt: Formater.formatarDateNew(p.createdAt),
                         albums:
                              albums == "true"
                                   ? p.albums.map((pi: any) => {
                                          return {
                                               ...pi,
                                               time: Formater.formatarTime(
                                                    pi.time
                                               ),
                                               date: Formater.formatarDateNew(
                                                    pi.date
                                               ),
                                          }
                                     })
                                   : [],
                    }
               })

               return artists
          } catch (err: any) {
               throw { status: "error", code: 400, message: err.message }
          }
     }
}
