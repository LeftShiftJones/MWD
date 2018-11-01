/**
 * Program to return the time and temparature in beautiful Upland, IN.
 * First project due for COS 243 - Multitier Web Application Development
 * Completed: 09/11/2018
 * @author Ryan Jones
 * @version 1.0
 */

//Make sure dependent packages are imported correctly
var request = require('request');
var moment = require('moment');

/**
 * Create promise object to asynchronously request data from OWM
 */
function promiseWeather () {
    return new Promise((resolve, reject) => {
        request('http://api.openweathermap.org/data/2.5/weather?id=4927510&APPID=32843bad9e96bb36c7935458544b1628&units=imperial', (error, response, body) => {
            if(error) {
                reject(error);
            } else {
                var obj = JSON.parse(body);
                console.log(`At ${moment().format('LT')}, it's ${obj.main.temp} degrees`);
                resolve(body);
            }
        });
    });
}

promiseWeather();
