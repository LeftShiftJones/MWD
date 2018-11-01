/**
KNEX Object
*/
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'faraday.cse.taylor.edu',
        user: 'readonly',
        password: 'nerds4christ',
        database: 'dvdrental'
    }
});

/**
HAPI Server Details
*/
const Hapi = require('hapi');
const server = Hapi.server({
    host: 'localhost',
    port: 3000
});

/**
Routes for HAPI Server
*/
server.route([
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello, Dr. Nurkkala';
        }
    },
    {
        method: 'GET',
        path: '/countries',
        handler: (request, h) => {
            return knex.select('country_id', 'country').from('country');
        }
    },
    {
        method: 'GET',
        path: '/films/{film_id}',
        handler: (request, h) => {
            return knex.select('film_id', 'title', 'rental_rate')
                .from('film')
                .where('film_id', request.params.film_id).first();
        }
    },
    {
        method: 'GET',
        path: '/films',
        handler: (request, h) => {
            if(request.query.title == null) { //just looking for films
                return knex.select('film_id', 'title', 'rental_rate').from('film');
            } else {
                return knex.select('film_id', 'title', 'rental_rate').from('film').where('title', 'LIKE', request.query.title);
            }
        }
    }
]);

/**
Function to start the Server
*/
async function init() {
    await server.start();
    console.log(`Server running at ${server.info.uri}`)
};

//start the server
init();
