/**
 * Javascript program that runs through various asynchronous tasks,
 * uses promises and the async-await keywords to get random numbers from the web.
 * 
 * @author RYAN JONES
 * 09/17/2018
 */

// Import required packages
const https = require('https');
const debug = false;

/**
 * Format JSON object information for simplification
 * @param {*} jsonObject
 */
function prettyPrintJson(jsonObject) {
    return JSON.stringify(jsonObject, null, 2);
}


/**
 * Data for request to random.org
 */
const randomOrgRequestOptions = {
    hostname: 'api.random.org',
    method: 'POST',
    path: '/json-rpc/1/invoke',
    headers: { 'Content-Type': 'application/json-rpc' }
};


/**
 * Data to generate integers in a given range
 */
const generateIntegersPostData = {
    "jsonrpc": "2.0",
    "method": "generateIntegers",
    "params": {
        "apiKey": "d8e8fe5f-4d3c-4d2a-8410-04ced4ec17aa",
        "n": 5,
        "min": 1,
        "max": 100
    },
    "id": 1
};


/**
 * Function that asynchronously calls for random numbers
 * @param {*} requestOptions 
 * @param {*} postData 
 */
function randomOrgApiCallback(requestOptions, postData) {
    const request = https.request(requestOptions, response => {
        if (debug) {
            console.log(`STATUS: ${response.statusCode}`);
        }

        response.setEncoding('utf8');
        const chunks = [];

        response.on('data', chunk => {
            if (debug) {
                console.log(`CHUNK: ${prettyPrintJson(JSON.parse(chunk))}`);
            }
            chunks.push(chunk);
        });

        response.on('end', () => {
            const content = chunks.join('');
            console.log(`CONTENT (Callback): \n${prettyPrintJson(JSON.parse(content))}`);
        });
    });

    request.on('error', err => {
        console.error(`Request error: ${err}`);
    });

    request.write(JSON.stringify(postData));
    request.end();
}


/**
 * Function uses a promise to get random numbers data
 * @param {*} request_options 
 * @param {*} post_data 
 */
function randomOrgApiPromise(request_options, post_data) {
    return new Promise((resolve, reject) => {
        const request = https.request(request_options, response => {
            if (debug) {
                console.log(`STATUS: ${response.statusCode}`);
            }

            response.setEncoding('utf8');
            const chunks = [];

            response.on('data', chunk => {
                if (debug) {
                    console.log(`CHUNK: ${prettyPrintJson(JSON.parse(chunk))}`);
                }
                chunks.push(chunk);
            });

            response.on('end', () => {
                const content = chunks.join('');
                resolve(content);
            });
        });

        request.on('error', err => {
            console.error(`Request error: ${err}`);
            reject(error)
        });
        request.write(JSON.stringify(post_data));
        request.end();
    });
}


/**
 * Function that uses the async-await keywords to call a promisified function
 */
async function randomOrgApiFunction() {
    try {
        let result = await randomOrgApiPromise(randomOrgRequestOptions, generateIntegersPostData);
        console.log(`CONTENT (Async Function):\n${prettyPrintJson(JSON.parse(result))}`);
    } catch (err) {
        console.log(`Something went wrong: ${err}`);
    }
}


/**
 * Function calls to test implementation
 */

//regular async
randomOrgApiCallback(randomOrgRequestOptions, generateIntegersPostData);
//promisified async
randomOrgApiPromise(randomOrgRequestOptions, generateIntegersPostData)
    .then(content => console.log(`CONTENT (Promise):\n${prettyPrintJson(JSON.parse(content))}`))
    .catch(error => console.log(`BUMMER: ${error}`));
//async-await
randomOrgApiFunction();
