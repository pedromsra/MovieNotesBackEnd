const { Router } = require('express'); //importando Router http do express

const UsersController = require("../controller/UsersController"); //importando o controller para a rota users

const userRoutes = Router(); //iniciando o router

const usersController = new UsersController(); //iniciando o controller

userRoutes.post("/" , usersController.create); //para criar
userRoutes.put("/:id", usersController.update);//:id sera usado no params //para atualizar

userRoutes.delete("/:id", usersController.delete); //deletar usuário

module.exports = userRoutes;