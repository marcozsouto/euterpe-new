import Artist from "../models/Artist"
import { Request, Response, NextFunction } from "express"

export class MusicController {
     async store(req: Request, res: Response) {
          try {
               const artist = await Artist.create(req.body)
               return res.json(artist)
          } catch (error: any) {
               return res.status(error.code || 500).json(error)
          }
     }

     async index(req: Request, res: Response) {
          try {
               const artists = await Artist.findAll()
               return res.json(artists)
          } catch (error: any) {
               return res.status(error.code || 500).json(error)
          }
     }
}

module.exports = new MusicController()
