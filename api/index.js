const express = require('express');
const path    = require('path');
const morgan  = require('morgan');
const axios   = require('axios');
const cors    = require('cors')
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

server.use((err, _req, res, next) => {
    const status  = err.status  || 500;
    const message = err.message || err;
    res.status(status).json({message});
    next();
});

server.listen(process.env.PORT || 5000, () => {
    console.log('--- Weather API listening at 5000...')
});