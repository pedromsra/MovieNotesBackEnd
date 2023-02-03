const {Router} = require("express");

const usersRoutes = require("./users.routes")
const movieNotesRoutes = require("./movienotes.routes");
const tagsRoutes = require("./tags.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movie_notes", movieNotesRoutes);
routes.use("/tags", tagsRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;