//Add/remove helpful dialogue of program.
let debug = true;

/**
 * Set up KNEX object
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
 * First Query
 */
let query_one = knex
    .select('category_id', 'name')
    .from('category');
if(debug) { console.log(query_one.toString(), '\n'); }

/**
 * Second Query
 */
let query_two = knex
    .select('title', 'rental_duration')
    .from('film')
    .where('title', 'LIKE', 'S%')
    .andWhere(function() { this.whereBetween('rental_duration', [4, 6])} )
    .orderBy('rental_duration', 'desc')
    .orderBy('title');
if(debug) { console.log(query_two.toString(), '\n'); }

/**
 * Third Query
 */
let query_three = knex
    .select('country')
    .count('city_id AS city_count')
    .from('city')
    .innerJoin('country',
            'city.country_id',
            'country.country_id')
    .groupBy('country')
    .orderBy('city_count', 'desc');
if(debug) { console.log(query_three.toString(), '\n'); }

if(debug) { console.log(`Starting queries...\n`); }

/**
 * Handling of promise objects
 */
query_one
    .then(result => {console.log(result); console.log('');})
    .then(() => {query_two
                    .then(result => {console.log(result); console.log('');})})
                    .then(() => query_three
                            .then(result => {console.log(JSON.stringify(result, null, 4)); console.log(''); }))
                            .then(() => knex.destroy())
                            .catch(err => console.log(`Problem with city count query:\n\t${err.message}`))
                    .catch(err => console.log(`Problem with title/rent duration query:\n\t${err.message}`))
    .catch(err => console.log(`Problem with category query:\n\t${err.message}`));
