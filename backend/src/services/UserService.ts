import { Op } from "sequelize"
import jwt from "jsonwebtoken"
import { Encrpyt } from "../helpers/Encrpyt"
import Formater from "../helpers/Formater"
import FileReader from "../helpers/FileReader"

import User from "../models/User"
import Playlist from "../models/Playlist"
import Music from "../models/Music"
import Artist from "../models/Artist"
import Album from "../models/Album"

export default class UserService {
     static async login(login: string, password: string) {
          let user: any = await User.findOne({
               where: {
                    [Op.or]: [{ username: login }, { email: login }],
               },
               include: [
                    { model: Playlist, as: "playlist", attributes: ["id"] },
               ],
               nest: true,
          })

          if (user) {
               user.playlists = user.playlist.map((e: any) => e.id)

               if (await Encrpyt.compare(password, user.password)) {
                    const token = jwt.sign(user, String(process.env.SECRET), {
                         expiresIn: "24h",
                         algorithm: "RS256",
                    })

                    return { token: token }
               }

               throw {
                    message: `password incorrect`,
                    status: "error",
                    code: 400,
               }
          }

          throw { message: `login doesn't exist`, status: "error", code: 400 }
     }

     static async store(data: any) {
          try {
               if (!data.files.icon || !data.files.icon[0])
                    throw { message: "invalid icon passed" }

               const info: any = {
                    name: data.name,
                    icon: data.files.icon[0].path,
                    username: data.username,
                    password: await Encrpyt.encrypt(data.password),
                    email: data.email,
                    age: data.age,
                    birthdate: data.age,
                    status: "activated",
               }

               const user = await User.create(info)

               return 1
          } catch (err: any) {
               if (data.files) FileReader.remove(data.files)
               throw { status: "error", code: 400, message: err.message }
          }
     }

     static async getPlaylists(id: number) {
          let playlists = await Playlist.findAll({
               attributes: [
                    `name`,
                    `description`,
                    `icon`,
                    `userId`,
                    `createdAt`,
                    `updatedAt`,
               ],
               where: { userId: id },
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

          playlists = playlists.map((team) => team.get({ plain: true }))

          playlists = playlists.map((p: any) => {
               return {
                    ...p,
                    createdAt: Formater.formatarDateNew(p.createdAt),
                    updatedAt: Formater.formatarDateNew(p.updatedAt),
               }
          })

          return playlists
     }

     static async getArtist(query: any, id: number) {
          let { albums, musics } = query

          let include: any =
               albums == "true"
                    ? [
                           {
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
                           },
                      ]
                    : []

          include.push({
               model: User,
               as: "users",
               attributes: [],
               through: { attributes: [] },
               where: { userId: id },
          })

          let artists: any = await Artist.findAll({
               attributes: [
                    `id`,
                    `name`,
                    `description`,
                    `icon`,
                    `followers`,
                    `cover`,
               ],
               include: include,
               nest: true,
          })
          artists = artists.map((team: any) => team.get({ plain: true }))

          artists = artists.map((p: any) => {
               return {
                    ...p,
                    albums:
                         albums == "true"
                              ? p.albums.map((pi: any) => {
                                     return {
                                          ...pi,
                                          time: Formater.formatarTime(pi.time),
                                          date: Formater.formatarDateNew(
                                               pi.date
                                          ),
                                     }
                                })
                              : [],
               }
          })

          return artists
     }
}
