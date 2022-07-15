const axios = require('axios');

const geocode = (address, callback) => {
    const params = {
        access_key: 'a54ded528c8c0fa29d84116f84835f5f',
        query: address
    }

    // http://api.positionstack.com/v1/forward?access_key=a54ded528c8c0fa29d84116f84835f5f&query=1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC
    axios
        .get('http://api.positionstack.com/v1/forward', { params })
        .then(res => {
            if (res.data.error || res.data.data.length === 0) {
                // console.log('Error', res.data.error.message);
                callback('Unable to find location. Try another search.');
                return;
            }
            // console.log(`statusCode: ${res.status}`);
            // console.log(`data:`, res.data);

            const firstMatch = res.data.data[0];
            callback(undefined, {
                location: firstMatch.label,
                latitude: firstMatch.latitude,
                longitude: firstMatch.longitude,
            });

        })
        .catch(error => {
            // console.error(error);
            callback('Unable to connect to location service!');
        });

};

module.exports = geocode;