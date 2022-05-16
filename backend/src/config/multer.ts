import multer, { FileFilterCallback } from "multer"
import path from "path"
import crypto from "crypto"
import { Request } from "express"
require("dotenv/config")

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storageTypes: any = {
     local: multer.diskStorage({
          destination: (
               req: Request,
               file: Express.Multer.File,
               cb: DestinationCallback
          ) => {
               cb(null, `./uploads/${file.fieldname}`)
          },
          filename: (
               req: Request,
               file: Express.Multer.File,
               cb: FileNameCallback
          ) => {
               const extension = file.originalname.split(".")[1]
               const newName = crypto.randomBytes(32).toString("hex")

               cb(null, `${Date.now()}${newName}.${extension}`)
          },
     }),
}

const image: any = {
     dest: path.resolve("uploads", "icon"),
     storage: storageTypes[String(process.env.STORAGE_TYPE)],
     limits: {
          fileSize: 12 * 1024 * 1024,
     },
     fileFilter: (
          req: Request,
          file: Express.Multer.File,
          cb: FileFilterCallback
     ) => {
          const allowedMimes = ["image/jpeg", "image/pjpeg"]
          if (allowedMimes.includes(file.mimetype)) {
               cb(null, true)
          } else {
               cb(
                    new Error(
                         `File type is wrong, must be ${allowedMimes
                              .toString()
                              .replace(",", ", ")}`
                    )
               )
          }
     },
}

const music: any = {
     dest: path.resolve("uploads", "music"),
     storage: storageTypes[String(process.env.STORAGE_TYPE)],
     limits: {
          fileSize: 12 * 1024 * 1024,
     },
     fileFilter: (
          req: Request,
          file: Express.Multer.File,
          cb: FileFilterCallback
     ) => {
          const allowedMimes = ["audio/mp3", "audio/m4a"]
          if (allowedMimes.includes(file.mimetype)) {
               cb(null, true)
          } else {
               cb(
                    new Error(
                         `File type is wrong, must be ${allowedMimes
                              .toString()
                              .replace(",", ", ")}`
                    )
               )
          }
     },
}

export { image, music }
