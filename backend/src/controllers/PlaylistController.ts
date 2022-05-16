import { Request, Response, NextFunction } from "express"
import PlaylistService from "../services/PlaylistService"
import multer from "multer"
import { image } from "../config/multer"

export class PlaylistController {
     static uploadFile(req: Request, res: Response, next: NextFunction) {
          const upload = multer(image).fields([{ name: "icon" }])

          upload(req, res, function (err) {
               if (err instanceof multer.MulterError) {
                    return res.status(500).json({
                         status: "error",
                         code: 400,
                         message: err.message,
                    })
               } else if (err) {
                    return res.status(500).json({
                         status: "error",
                         code: 400,
                         message: err.message,
                    })
               }
               next()
          })
     }

     static async store(req: Request, res: Response) {
          try {
               // Validator.validateString(name, [0, 255], 'name');
               // Validator.validateString(description, [0, 255], 'description');
               const response: any = await PlaylistService.store({
                    ...req.body,
                    files: req.files,
                    userId: req.user.id,
               })

               return res.json({ status: "success", response })
          } catch (error: any) {
               return res.status(error.code || 500).json(error)
          }
     }

     static async index(req: Request, res: Response) {
          try {
               const response: any = await PlaylistService.showAll()

               return res.json({ status: "success", response })
          } catch (error: any) {
               return res.status(error.code || 500).json(error)
          }
     }

     static async addToPlaylist(req: Request, res: Response) {
          try {
               // Validator.validateNumber(musicId, false, "musicId");
               // Validator.validateNumber(playlistId, false, "playlistId");
               const response: any = await PlaylistService.addMusic(
                    req.body.musicId,
                    req.body.playlistId,
                    req.user
               )

               return res.json({ status: "success", response })
          } catch (error: any) {
               return res.status(error.code || 500).json(error)
          }
     }
}
