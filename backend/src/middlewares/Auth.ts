import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export class Auth {
     static async authorization(
          req: Request,
          res: Response,
          next: NextFunction
     ) {
          try {
               const token: string = String(req.headers["x-access-token"])

               if (!token)
                    return res
                         .status(401)
                         .json({ auth: false, message: "No token provided." })

               req.user = jwt.verify(token, String(process.env.SECRET), {
                    algorithms: ["RS256"],
               })
               next()
          } catch (err) {
               return res.status(500).json({
                    auth: false,
                    message: "Failed to authenticate token.",
               })
          }
     }
}
