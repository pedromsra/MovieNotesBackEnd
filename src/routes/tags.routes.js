const {Router} = require("express");

const tagsRoutes = Router();

const TagsController = require("../controller/TagsController");

const tagsController = new TagsController;

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

tagsRoutes.use(ensureAuthenticated);

tagsRoutes.get("/", tagsController.index)

module.exports = tagsRoutes;