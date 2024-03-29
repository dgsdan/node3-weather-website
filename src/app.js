require('dotenv').config();

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

// Defines paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Danilo Silveira'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Danilo Silveira'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Needs any help?',
        name: 'Danilo Silveira'
    });
});

app.get('/weather', (req, res) => {
    const { query } = req;
    const { address } = query;
    if (!address) {
        res.send({
            error: 'You must provide a address.'
        });
        return;
    }

    geocode(address || '598 Rua Dom Prudêncio Gomes, Belo Horizonte, Brazil', (error, data) => {
        if (error) {
            res.send({ error });
            return;
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                res.send({ error });
                return;
            }

            res.send({
                forecast: forecastData,
                location: data.location,
                address
            });
        });
    });
});

app.get('/products', (req, res) => {
    const { query } = req;
    if (!query.search) {
        res.send({
            error: 'You must provide a search term.'
        });
        return;
    }
    // console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Danilo Silveira'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Danilo Silveira'
    });
});


// Starts up the server and has a listen in the specific port
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});





//// Draft
// What server should do when a user tries to get the resources from a specific URL, in that case, root.
// app.get('', (req, res) => {
//     // Request => data from the request
//     // Response => data that will be the response

//     res.send('<h1>Hello express</h1>');
// });
// app.get('/help', (req, res) => {
//     // res.send('Help page!');
//     res.send([{
//         name: 'Danilo',
//         age: 31
//     }])
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>!');
// });
