const {Router} = require("express");


const userRoutes = require("./users.routes")
const movieNotesRoutes = require("./movienotes.routes");
const tagsRoutes = require("./tags.routes");

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/movie_notes", movieNotesRoutes)
routes.use("/tags", tagsRoutes)

module.exports = routes;