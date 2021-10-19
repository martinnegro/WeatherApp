const express = require('express');
const path    = require('path');
const morgan  = require('morgan');
const axios   = require('axios');
const cors    = require('cors');
const fetch   = require('node-fetch');
require('dotenv').config();
const { API_KEY } = process.env

const server = express();
server.name = 'API'

server.use(morgan('dev'));
server.use(cors());

server.get('/',(req, res) => {
    res.send('Hola mundo')
})

server.get('/api', (req, res, next) => {
    const { city } = req.query;
    if (city) {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=es&units=metric`)
            .then(response => {
                res.json(response.data)
            }).catch(err => {
                err.status  = 500;
                err.message = 'Hubo un problema con la API de OWM';
                next(err)
            });
    } else {
        const err = new Error('No fue provisto un nombre de ciudad.')
        err.status = 400;
        next(err);
    }
});

server.get('/api/currentlocation', async (req, res, next) => {
    const { lat, lon } = req.query;
    if ( lat && lon ) {
        try {    
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall`,{
                params: {
                    lat,
                    lon,
                    exclude: 'minutely,hourly',
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'es'
                }
            });
            res.json(data)
        } catch (err) {
            next(err)
        }             
    } else {
        const err = new Error('Debes proveer latitud y longitud');
        err.status = 400;
        next (err);
    }

});

server.get('/get_layer/:s/:z/:x/:y.png', async (req, res, next) => {
    const { s, z, x, y } = req.params;
    // const response = await axios.get(`https://${s}.tile.openweathermap.org/map/clouds_new/${z}/${x}/${y}.png?appid=${API_KEY}`);
    // res.writeHead(200, {
    //     'Content-Type': 'image/png',
    //     'Content-Length': response.data.length,
    //     'Connection': 'keep-alive',
    //     'Filename': `${z}/${x}/${y}.png`
    //   })
    // res.pipe(response);

    //https://stackoverflow.com/questions/18432779/piping-remote-file-in-expressjs
    fetch(`https://${s}.tile.openweathermap.org/map/clouds_new/${z}/${x}/${y}.png?appid=${API_KEY}`)
        .then(actual => {
            actual.headers.forEach((v, n) => res.setHeader(n, v));
            actual.body.pipe(res);
        });

});


server.use((err, _req, res, next) => {
    const status  = err.status  || 500;
    const message = err.message || err;
    res.status(status).json({message});
    next();
});

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`--- Weather API listening at ${port}...`)
});
