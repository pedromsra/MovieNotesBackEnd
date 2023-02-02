const knex = require("../database/knex");

const AppError = require("../utils/AppError");

class MovieNotesController {
    async create(request, response){
        const { title, description, rating, tags } = request.body
        const { user_id } = request.params

        
        if (rating > 5 || rating < 1) {
            throw new AppError("Por favor, digite um valor entre 1 e 5")
        }
        
        const note_id = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        })

        const tagsInsert = tags.map(name => {
            return{
                note_id,
                user_id,
                name
            }
        })

        await knex("tags").insert(tagsInsert);


        response.json()
    }

    async show(request, response){
        const { id } = request.params;

        console.log("oi")

        const note = await knex("movie_notes").where({id}).first();
        const tags = await knex("tags").where({note_id:id}).orderBy("name");

        response.json({
            ...note,
            tags
        })
    }

    async index(request, response){
        const {title, user_id, tags, rating} = request.query

        let notes;

        if(tags){
            console.log("ola")
            const filterByTag = tags.split(',').map(tag => tag.trim());
            console.log(filterByTag)
            notes = await knex("tags") //primeira tabel do innerJoin
            .select([
                "movie_notes.id",
                "movie_notes.title",
                "movie_notes.user_id",
                "movie_notes.rating"
            ])
            .where("movie_notes.user_id", user_id)
            .whereLike("movie_notes.title", `%${title}%`)
            .whereLike("movie_notes.rating", `%${rating}%`)
            .whereLike("name", `%${filterByTag}%`)
            .innerJoin("movie_notes", "tags.note_id", "movie_notes.id") //segunda tabela do innerJoin, variavel relacionada 1, variavel relacionada 2
        } else {
            if(rating) {
                notes = await knex("movie_notes")
                .where({user_id})
                .where("rating", rating)
                .orderBy("rating")
            } else {
            notes = await knex("movie_notes")
            .where({user_id})
            .whereLike("title", `%${title}`)
            .orderBy("name")
            }
        }

        const userTag = await knex("tags").where({user_id})
        const movieNotesWithTags = notes.map(note => {
            const movieNotesTag = userTag.filter(tag => tag.note_id === note.id)
            return {
                ...note,
                movieNotesTag
            }
        })


        response.json(movieNotesWithTags)
    }

    async delete(request, response){
        const {id} = request.params

        await knex("movie_notes").where({id}).delete()

        response.json()
    }

    async update(request, response){
        const {id} = request.params
        const { title, description, rating } = request.body

        const note = await knex("movie_notes").where({id}).first();

        note.title = title ?? note.title;
        note.description = description ?? note.description;
        note.rating = rating ?? note.rating;
    
        
        await knex("movie_notes").where({id}).update({
            title: note.title,
            description: note.description,
            rating: note.rating,
            updated_at: new Date().toISOString().replace('Z','').replace('T', ' ')
        })
        response.json()
    }
}

module.exports = MovieNotesController