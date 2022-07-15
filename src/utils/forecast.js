const axios = require('axios');

const forecast = (latitude, longitude, callback) => {
    const params = {
        access_key: '81bb199421eb76eedcfcdfad83c597ed',
        query: latitude + ',' + longitude
        // query: latitude
    };

    // http://api.weatherstack.com/current?access_key=81bb199421eb76eedcfcdfad83c597ed&query=Belo%20Horizonte
    axios
        .get('http://api.weatherstack.com/current', { params })
        .then(res => {
            if (res.data.error) {
                callback(res.data.error.info);
                return;
            }

            // console.log(`statusCode: ${res.status}`);
            // console.log(`statusCode:`, res.data);
            const current = res.data.current;
            callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. But it feels like ${current.feelslike} degrees out.`);
        })
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message);
            }
            // console.log(error.config);
            callback('Unable to connect to weather service!');
        });
}

module.exports = forecast;