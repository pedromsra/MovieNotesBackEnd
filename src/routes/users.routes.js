const { Router } = require('express'); //importando Router http do express
const multer = require("multer");

const UsersController = require("../controller/UsersController"); //importando o controller para a rota users

const usersRoutes = Router(); //iniciando o router

const usersController = new UsersController(); //iniciando o controller

const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const UserAvatarController = require("../controller/UserAvatarController")
const userAvatarController = new UserAvatarController();

const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);

usersRoutes.post("/" , usersController.create); //para criar

usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)
usersRoutes.put("/", ensureAuthenticated, usersController.update);//:id sera usado no params //para atualizar
usersRoutes.delete("/", ensureAuthenticated, usersController.delete); //deletar usuário

module.exports = usersRoutes;