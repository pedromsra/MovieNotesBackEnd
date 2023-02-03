const {Router} = require("express");

const MovieNotesController = require("../controller/MovieNotesController");

const movieNotesRoutes = Router();

const movieNotesController = new MovieNotesController();

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

movieNotesRoutes.use(ensureAuthenticated);

movieNotesRoutes.post("/", movieNotesController.create);
movieNotesRoutes.delete("/:id", movieNotesController.delete);
movieNotesRoutes.get("/:id", movieNotesController.show);
movieNotesRoutes.get("/", movieNotesController.index);
movieNotesRoutes.put("/:id", movieNotesController.update)

module.exports = movieNotesRoutes;