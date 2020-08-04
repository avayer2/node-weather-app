const request = require('request');

const geoCode = (address, callback) => {
    const geoUrl = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXZheWVyMTEiLCJhIjoiY2tkOGppMDV2MHFrMjJ4dGdhdTNwaDd5cyJ9.1vvwcRuz3lLPDZln6-wSNQ&limit=1';
    request({ url: geoUrl, json: true }, (err, res) => {
        if (err) {
            callback('unable to connect to service', undefined);
        }
        else if (res.body.features.length === 0) {
            callback('enter location correctly', undefined);
        }
        else {
            callback(undefined, {
                place: res.body.features[0].place_name,
                lat: res.body.features[0].center[0],
                lon: res.body.features[0].center[1]
            })
        }
    })
}

module.exports = geoCode;