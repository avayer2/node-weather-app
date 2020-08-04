const request = require('request');
const { callbackify } = require('util');

const foreCast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=bdb56be7bacc9b5ac9285a96b721f31f&query=${lon},${lat}&units=m`;
    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback('unable to connect to service', undefined);
        }
        else if (res.body.error) {
            callback('not data found', udefined);
        }
        else {
            callback(undefined, {
                temp: res.body.current.temperature,
                type: res.body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = foreCast;