import { Router, Request, Response } from "express"
import { UserController } from "./controllers/UserController"
import { PlaylistController } from "./controllers/PlaylistController"
import { ArtistController } from "./controllers/ArtistController"
import { Auth } from "./middlewares/Auth"

require("dotenv/config")
require("./database")
const routes = Router()

// Auth Routes
routes.post("/login", UserController.login)
routes.post("/signup", UserController.uploadFile, UserController.signup)

//Playlist Routes
routes.use("/playlist", Auth.authorization)
routes.post(
     "/playlist/store",
     PlaylistController.uploadFile,
     PlaylistController.store
)
routes.get("/playlists", PlaylistController.index)
routes.post("/playlist/add/music", PlaylistController.addToPlaylist)

//Artist Routes
routes.use("/artist", Auth.authorization)
routes.post(
     "/artist/store",
     ArtistController.uploadFile,
     ArtistController.store
)
routes.get("/artists", ArtistController.index)
routes.post("/artist/update", ArtistController.update)

//User Routes
routes.use("/user", Auth.authorization)
routes.get("/user/playlists", UserController.userPlaylists)
routes.get("/user/artists", UserController.userArtists)

routes.get("/", (req: Request, res: Response) => {
     res.send({ message: "Hello you're connected to euterpe API" })
})

export default routes
