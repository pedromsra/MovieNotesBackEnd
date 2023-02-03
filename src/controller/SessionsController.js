const knex = require("../database/knex"); //Para acessar a db
const AppError = require("../utils/AppError"); //Para emitir algum erro na aplicação
const {compare} = require("bcryptjs"); //será usado na verificação da senha
const { sign } = require("jsonwebtoken");

const authConfig = require("../configs/auth");

class SessionsController {
    async create(request, response){
        const {email, password} = request.body;
        const user = await knex("users").where({email}).first();

        //verificar email

        if(!user){
            throw new AppError("Email e/ou senha inválido.", 401);
        }

        //verificar senha

        const passwordCheck = await compare(password, user.password);

        if(!passwordCheck){
            throw new AppError("Email e/ou senha inválido.", 401);
        }

        //Pegar configuração de jwt

        const {secret, expiresIn} = authConfig.jwt;

        //Criar token com a função SignIn

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.json({user, token});
    }
}

module.exports = SessionsController;