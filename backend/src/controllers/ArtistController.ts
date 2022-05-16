import { Request, Response, NextFunction } from "express"
import ArtistService from "../services/ArtistService"
import multer from "multer"
import { image } from "../config/multer"

export class ArtistController {
     static uploadFile(req: Request, res: Response, next: NextFunction) {
          const upload = multer(image).fields([
               { name: "icon" },
               { name: "cover" },
          ])

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
               const response: any = await ArtistService.store({
                    ...req.body,
                    files: req.files,
               })

               return res.json({ status: "success", response })
          } catch (error: any) {
               return res.status(error.code || 500).json(error)
          }
     }

     static async index(req: Request, res: Response) {
          try {
               const response: any = await ArtistService.showAll(req.query)

               return res.json({ status: "success", response })
          } catch (error: any) {
               return res.status(error.code || 500).json(error)
          }
     }

     static async update(req: Request, res: Response) {
          try {
               return res.json({ status: 1 })
          } catch (error: any) {
               return res.status(error.code || 500).json(error)
          }
     }

     static async random(req: Request, res: Response) {
          try {
               return res.json({ status: 1 })
          } catch (error: any) {
               return res.status(error.code || 500).json(error)
          }
     }
}
