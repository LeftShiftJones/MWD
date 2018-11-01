/**
    I requre these to run
*/
const knex = require('knex')({
    client: 'pg',
    connection:{
        host: 'faraday.cse.taylor.edu',
        user: 'readonly',
        password: 'nerds4christ',
        database: 'dvdrental'
    }
});
const { Model } = require('objection');
Model.knex(knex);


/**
    Actor class
*/
class Actor extends Model {
    static get tableName() {
        return 'actor';
    }

    /**
     * You are most definitely a function,
     * why do you throw errors?
     */
     getFullName() {
        return `${this.first_name} ${this.last_name}`;
    }
}

/**
    Function to get all actors with a specific first name
    @param prefix First letter of first name
*/
async function actors_starting_with(prefix) {
    try {
        let actors = await Actor.query();
        actors.forEach(actor => {
            if(actor.first_name.startsWith(prefix) || actor.last_name.startsWith(prefix)) { console.log(actor.getFullName()); }
        });
        knex.destroy();
    } catch(error) {
        console.error(`Error: ${error.message}`);
        knex.destroy();
    }
}


// Flip ze svitch!
actors_starting_with(`F`);
