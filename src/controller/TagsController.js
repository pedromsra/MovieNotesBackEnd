const knex = require("../database/knex");

class TagsController {
    async index(request, response){
        const user_id = request.user.id;

        const tagsIndex = await knex("tags").where({user_id}).orderBy("name");

        response.json(tagsIndex);
    }
}

module.exports = TagsController