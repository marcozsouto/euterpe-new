import { Request, Response, NextFunction } from "express"
import UserService from "../services/UserService"
import multer from "multer"
import { image } from "../config/multer"

export class UserController {
     static async login(req: Request, res: Response) {
          try {
               // Validator.validateString(req.body.login, [0, 255], "login");
               // Validator.validateString(req.body.password, [0, 255], "password");

               let { token } = await UserService.login(
                    req.body.login,
                    req.body.password
               )

               return res.status(200).json({ status: "success", token })
          } catch (error: any) {
               console.error(error)
               return res.status(error.code || 500).json(error)
          }
     }

     static uploadFile(req: Request, res: Response, next: NextFunction) {
          try {
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
          } catch (err: any) {
               return res
                    .status(500)
                    .json({ status: "error", code: 400, message: err.message })
          }
     }

     static async signup(req: Request, res: Response) {
          try {
               // Validator.validateString(req.body.name, [0, 255], "name");
               // Validator.validateString(req.body.username, [0, 255], "username");
               // Validator.validateString(req.body.password, [0, 255], "password");
               // Validator.validateString(req.body.email, [0, 255], "email");
               // Validator.validateNumber(req.body.age, [0, 110], "age");
               // Validator.validateDate(req.body.birthdate, "birthdate");

               const response = await UserService.store({
                    ...req.body,
                    files: req.files,
               })

               return res.json({ status: "success", response: response })
          } catch (error: any) {
               return res.status(error.code || 500).json(error)
          }
     }

     static async userPlaylists(req: Request, res: Response) {
          try {
               const response = await UserService.getPlaylists(req.user.id)

               return res.json({ status: "success", response })
          } catch (error: any) {
               return res.status(error.code || 500).json(error)
          }
     }

     static async userArtists(req: Request, res: Response) {
          try {
               const response = await UserService.getArtist(
                    req.query,
                    req.user.id
               )

               return res.json({ status: "success", response })
          } catch (error: any) {
               return res.status(error.code || 500).json(error)
          }
     }
}
