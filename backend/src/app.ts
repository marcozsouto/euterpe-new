import express, { Express } from "express"
import cors from "cors"
import routes from "./routes"
import path from "path"

const icons = express.static("images")
const files = express.static(path.resolve(__dirname, "..", "tmp", "uploads"))

export class App {
     public server: Express

     constructor() {
          this.server = express()
          this.server.use(express.json())
          this.server.use(cors())
          this.server.use("/files", files)
          this.server.use("/icon", icons)
          this.routes()
     }

     routes() {
          this.server.use(routes)
     }
}
