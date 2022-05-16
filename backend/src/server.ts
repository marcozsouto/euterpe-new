import { App } from "./app"

const app = new App().server

app.listen(process.env.PORT)
