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
    if ( city ) {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=es&units=metric`)
            .then(response => {
                res.json(response.data)
            }).catch(err => {
                err.status  = 500;
                err.message = 'Hubo un problema con la API de OWM';
                next( err )
            });

        console.log('hola')
    } else {
        err.status = 400;
        next( err );
    }
});

server.get('/api/currentlocation', async (req, res, next) => {
    const { lat, lon } = req.query;
    if ( lat && lon ) {
        try {  
            const forecastResponse = axios.get(`https://api.openweathermap.org/data/2.5/onecall`,{
                params: {
                    lat,
                    lon,
                    exclude: 'minutely',
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'es'
                }
            });
            const currentResponse = axios.get('https://api.openweathermap.org/data/2.5/weather',{
                params: {
                    lat,
                    lon,
                    appid: API_KEY,
                    units: 'metric',
                    lang: 'es'
                }
            });
            
            Promise.all([forecastResponse, currentResponse])
              .then((values) => {
                  const dataToSend = {
                  current: {
                    dt: values[1].data.dt,
                    name: values[1].data.name,
                    today: new Date(values[1].data.dt * 1000).toLocaleDateString('es-AR'),
                    icon: values[1].data.weather[0].icon,
                    main: values[1].data.main,
                    sun: {
                      sunrise: convertToHours(values[1].data.sys.sunrise),
                      sunset: convertToHours(values[1].data.sys.sunset)
                    }
                  },
                  forecast: {
                    daily: values[0].data.daily,
                    hourly: values[0].data.hourly,                
                  }
                }
              res.json(dataToSend)
            })
            .catch(err => next(err))
              
              
        } catch (err) {
            console.log(err)
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

////////////////////////////////////////////////////

const convertToHours = (UTC) => {
    const date = new Date(UTC * 1000);
    let hh = date.getHours();
    if (hh < 10) hh = `0${hh}`
    let mm = date.getMinutes();
    if (mm < 10) mm = `0${mm}`
    return `${hh}:${mm}`    
};


const data = `{
  "current": {
    "name": "Versailles",
    "today": "27/10/2021",
    "icon": "01n",
    "main": {
      "temp": 24.83,
      "feels_like": 24.75,
      "temp_min": 19.9,
      "temp_max": 26.66,
      "pressure": 1020,
      "humidity": 53
    },
    "sun": {
      "sunrise": "05:57",
      "sunset": "19:18"
    }
  },
  "forecast": {
    "daily": [
      {
        "dt": 1635346800,
        "sunrise": 1635325032,
        "sunset": 1635373105,
        "moonrise": 1635307140,
        "moonset": 1635342000,
        "moon_phase": 0.71,
        "temp": {
          "day": 31.92,
          "min": 19.85,
          "max": 32.9,
          "night": 24.54,
          "eve": 30.35,
          "morn": 19.85
        },
        "feels_like": {
          "day": 30.16,
          "night": 24.49,
          "eve": 28.94,
          "morn": 19.14
        },
        "pressure": 1019,
        "humidity": 24,
        "dew_point": 8.01,
        "wind_speed": 4.29,
        "wind_deg": 41,
        "wind_gust": 8.83,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "cielo claro",
            "icon": "01d"
          }
        ],
        "clouds": 4,
        "pop": 0,
        "uvi": 9.93
      },
      {
        "dt": 1635433200,
        "sunrise": 1635411368,
        "sunset": 1635459561,
        "moonrise": 1635396360,
        "moonset": 1635431880,
        "moon_phase": 0.75,
        "temp": {
          "day": 29.74,
          "min": 20.03,
          "max": 31,
          "night": 22.98,
          "eve": 27.8,
          "morn": 20.03
        },
        "feels_like": {
          "day": 29.62,
          "night": 23.08,
          "eve": 28.31,
          "morn": 19.92
        },
        "pressure": 1022,
        "humidity": 42,
        "dew_point": 14.94,
        "wind_speed": 4.87,
        "wind_deg": 79,
        "wind_gust": 12.61,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "nubes",
            "icon": "04d"
          }
        ],
        "clouds": 93,
        "pop": 0,
        "uvi": 8.72
      },
      {
        "dt": 1635519600,
        "sunrise": 1635497705,
        "sunset": 1635546017,
        "moonrise": 1635485220,
        "moonset": 1635521940,
        "moon_phase": 0.78,
        "temp": {
          "day": 25.87,
          "min": 18.36,
          "max": 27.48,
          "night": 21.59,
          "eve": 25.36,
          "morn": 18.36
        },
        "feels_like": {
          "day": 25.5,
          "night": 21.71,
          "eve": 25.39,
          "morn": 18.08
        },
        "pressure": 1019,
        "humidity": 38,
        "dew_point": 9.88,
        "wind_speed": 4.84,
        "wind_deg": 86,
        "wind_gust": 12.29,
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "algo de nubes",
            "icon": "02d"
          }
        ],
        "clouds": 15,
        "pop": 0,
        "uvi": 9.36
      },
      {
        "dt": 1635606000,
        "sunrise": 1635584044,
        "sunset": 1635632473,
        "moonrise": 1635573840,
        "moonset": 1635612120,
        "moon_phase": 0.81,
        "temp": {
          "day": 26.37,
          "min": 18.05,
          "max": 28.83,
          "night": 22.48,
          "eve": 27.01,
          "morn": 18.05
        },
        "feels_like": {
          "day": 26.37,
          "night": 22.69,
          "eve": 27.49,
          "morn": 18.16
        },
        "pressure": 1015,
        "humidity": 52,
        "dew_point": 15.56,
        "wind_speed": 4.88,
        "wind_deg": 64,
        "wind_gust": 12.54,
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "algo de nubes",
            "icon": "02d"
          }
        ],
        "clouds": 12,
        "pop": 0,
        "uvi": 9.75
      },
      {
        "dt": 1635692400,
        "sunrise": 1635670383,
        "sunset": 1635718930,
        "moonrise": 1635662220,
        "moonset": 1635702360,
        "moon_phase": 0.84,
        "temp": {
          "day": 17.03,
          "min": 13.57,
          "max": 20.28,
          "night": 15.45,
          "eve": 18.47,
          "morn": 13.57
        },
        "feels_like": {
          "day": 16.33,
          "night": 14.72,
          "eve": 17.83,
          "morn": 13.1
        },
        "pressure": 1022,
        "humidity": 59,
        "dew_point": 9.07,
        "wind_speed": 6.17,
        "wind_deg": 118,
        "wind_gust": 10.4,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "nubes",
            "icon": "04d"
          }
        ],
        "clouds": 100,
        "pop": 0,
        "uvi": 8.57
      },
      {
        "dt": 1635778800,
        "sunrise": 1635756724,
        "sunset": 1635805387,
        "moonrise": 1635750480,
        "moonset": 1635792720,
        "moon_phase": 0.88,
        "temp": {
          "day": 16.83,
          "min": 13.38,
          "max": 17.03,
          "night": 15.23,
          "eve": 15.65,
          "morn": 13.38
        },
        "feels_like": {
          "day": 16.32,
          "night": 15.26,
          "eve": 15.54,
          "morn": 12.68
        },
        "pressure": 1020,
        "humidity": 67,
        "dew_point": 10.71,
        "wind_speed": 5.1,
        "wind_deg": 127,
        "wind_gust": 10.28,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "lluvia ligera",
            "icon": "10d"
          }
        ],
        "clouds": 100,
        "pop": 0.67,
        "rain": 1.61,
        "uvi": 0.47
      },
      {
        "dt": 1635865200,
        "sunrise": 1635843067,
        "sunset": 1635891845,
        "moonrise": 1635838680,
        "moonset": 1635883140,
        "moon_phase": 0.91,
        "temp": {
          "day": 16.04,
          "min": 14.47,
          "max": 18.06,
          "night": 15.85,
          "eve": 17.52,
          "morn": 14.93
        },
        "feels_like": {
          "day": 16.08,
          "night": 15.68,
          "eve": 17.36,
          "morn": 15.01
        },
        "pressure": 1017,
        "humidity": 91,
        "dew_point": 14.55,
        "wind_speed": 4.88,
        "wind_deg": 138,
        "wind_gust": 10.56,
        "weather": [
          {
            "id": 500,
            "main": "Rain",
            "description": "lluvia ligera",
            "icon": "10d"
          }
        ],
        "clouds": 100,
        "pop": 1,
        "rain": 6.96,
        "uvi": 1
      },
      {
        "dt": 1635951600,
        "sunrise": 1635929410,
        "sunset": 1635978303,
        "moonrise": 1635926940,
        "moonset": 1635973740,
        "moon_phase": 0.95,
        "temp": {
          "day": 19.58,
          "min": 13.99,
          "max": 22.5,
          "night": 17.2,
          "eve": 21.31,
          "morn": 13.99
        },
        "feels_like": {
          "day": 19.13,
          "night": 17.04,
          "eve": 20.91,
          "morn": 13.82
        },
        "pressure": 1015,
        "humidity": 59,
        "dew_point": 11.44,
        "wind_speed": 4.97,
        "wind_deg": 156,
        "wind_gust": 9.38,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "muy nuboso",
            "icon": "04d"
          }
        ],
        "clouds": 73,
        "pop": 0.21,
        "uvi": 1
      }
    ],
    "hourly": [
      {
        "dt": 1635386400,
        "temp": 24.54,
        "feels_like": 24.49,
        "pressure": 1020,
        "humidity": 55,
        "dew_point": 14.91,
        "uvi": 0,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 2.92,
        "wind_deg": 34,
        "wind_gust": 8.42,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "cielo claro",
            "icon": "01n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635390000,
        "temp": 24.83,
        "feels_like": 24.75,
        "pressure": 1020,
        "humidity": 53,
        "dew_point": 14.61,
        "uvi": 0,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 2.87,
        "wind_deg": 35,
        "wind_gust": 8.42,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "cielo claro",
            "icon": "01n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635393600,
        "temp": 24.28,
        "feels_like": 24.23,
        "pressure": 1020,
        "humidity": 56,
        "dew_point": 14.95,
        "uvi": 0,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 2.68,
        "wind_deg": 30,
        "wind_gust": 8.21,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "cielo claro",
            "icon": "01n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635397200,
        "temp": 23.5,
        "feels_like": 23.45,
        "pressure": 1020,
        "humidity": 59,
        "dew_point": 15.03,
        "uvi": 0,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 2.5,
        "wind_deg": 24,
        "wind_gust": 8.11,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "cielo claro",
            "icon": "01n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635400800,
        "temp": 22.58,
        "feels_like": 22.51,
        "pressure": 1020,
        "humidity": 62,
        "dew_point": 14.94,
        "uvi": 0,
        "clouds": 9,
        "visibility": 10000,
        "wind_speed": 2.29,
        "wind_deg": 22,
        "wind_gust": 7.96,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "cielo claro",
            "icon": "01n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635404400,
        "temp": 21.48,
        "feels_like": 21.38,
        "pressure": 1021,
        "humidity": 65,
        "dew_point": 14.63,
        "uvi": 0,
        "clouds": 10,
        "visibility": 10000,
        "wind_speed": 2.23,
        "wind_deg": 23,
        "wind_gust": 7.57,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "cielo claro",
            "icon": "01n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635408000,
        "temp": 20.31,
        "feels_like": 20.2,
        "pressure": 1021,
        "humidity": 69,
        "dew_point": 14.48,
        "uvi": 0,
        "clouds": 33,
        "visibility": 10000,
        "wind_speed": 2.2,
        "wind_deg": 27,
        "wind_gust": 6.7,
        "weather": [
          {
            "id": 802,
            "main": "Clouds",
            "description": "nubes dispersas",
            "icon": "03n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635411600,
        "temp": 20.03,
        "feels_like": 19.92,
        "pressure": 1022,
        "humidity": 70,
        "dew_point": 14.55,
        "uvi": 0,
        "clouds": 55,
        "visibility": 10000,
        "wind_speed": 2.24,
        "wind_deg": 30,
        "wind_gust": 6.64,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "muy nuboso",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635415200,
        "temp": 21.01,
        "feels_like": 20.92,
        "pressure": 1022,
        "humidity": 67,
        "dew_point": 14.7,
        "uvi": 0.21,
        "clouds": 66,
        "visibility": 10000,
        "wind_speed": 2.46,
        "wind_deg": 30,
        "wind_gust": 7.33,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "muy nuboso",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635418800,
        "temp": 23.35,
        "feels_like": 23.28,
        "pressure": 1023,
        "humidity": 59,
        "dew_point": 14.77,
        "uvi": 0.95,
        "clouds": 70,
        "visibility": 10000,
        "wind_speed": 3.32,
        "wind_deg": 23,
        "wind_gust": 7.14,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "muy nuboso",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635422400,
        "temp": 25.2,
        "feels_like": 25.19,
        "pressure": 1023,
        "humidity": 54,
        "dew_point": 14.94,
        "uvi": 2.49,
        "clouds": 75,
        "visibility": 10000,
        "wind_speed": 3.31,
        "wind_deg": 24,
        "wind_gust": 6.37,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "muy nuboso",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635426000,
        "temp": 27.01,
        "feels_like": 27.37,
        "pressure": 1023,
        "humidity": 49,
        "dew_point": 15.11,
        "uvi": 4.59,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 3.43,
        "wind_deg": 29,
        "wind_gust": 6.23,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "nubes",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635429600,
        "temp": 28.4,
        "feels_like": 28.53,
        "pressure": 1022,
        "humidity": 46,
        "dew_point": 15.1,
        "uvi": 6.87,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 3.8,
        "wind_deg": 42,
        "wind_gust": 6.02,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "nubes",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635433200,
        "temp": 29.74,
        "feels_like": 29.62,
        "pressure": 1022,
        "humidity": 42,
        "dew_point": 14.94,
        "uvi": 8.57,
        "clouds": 93,
        "visibility": 10000,
        "wind_speed": 3.96,
        "wind_deg": 49,
        "wind_gust": 6.11,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "nubes",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635436800,
        "temp": 30.65,
        "feels_like": 30.47,
        "pressure": 1021,
        "humidity": 40,
        "dew_point": 14.68,
        "uvi": 8.72,
        "clouds": 76,
        "visibility": 10000,
        "wind_speed": 4.15,
        "wind_deg": 56,
        "wind_gust": 6.27,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "muy nuboso",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635440400,
        "temp": 31,
        "feels_like": 30.77,
        "pressure": 1020,
        "humidity": 39,
        "dew_point": 14.76,
        "uvi": 8.01,
        "clouds": 76,
        "visibility": 10000,
        "wind_speed": 4.48,
        "wind_deg": 64,
        "wind_gust": 6.58,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "muy nuboso",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635444000,
        "temp": 30.7,
        "feels_like": 30.53,
        "pressure": 1020,
        "humidity": 40,
        "dew_point": 15.07,
        "uvi": 6.27,
        "clouds": 80,
        "visibility": 10000,
        "wind_speed": 4.55,
        "wind_deg": 73,
        "wind_gust": 6.54,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "muy nuboso",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635447600,
        "temp": 30.05,
        "feels_like": 30.11,
        "pressure": 1019,
        "humidity": 43,
        "dew_point": 15.8,
        "uvi": 3.98,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 4.79,
        "wind_deg": 83,
        "wind_gust": 6.78,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "nubes",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635451200,
        "temp": 29.22,
        "feels_like": 29.46,
        "pressure": 1019,
        "humidity": 46,
        "dew_point": 16.17,
        "uvi": 2.04,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 4.76,
        "wind_deg": 85,
        "wind_gust": 6.77,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "nubes",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635454800,
        "temp": 27.8,
        "feels_like": 28.31,
        "pressure": 1019,
        "humidity": 51,
        "dew_point": 16.6,
        "uvi": 0.73,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 4.87,
        "wind_deg": 79,
        "wind_gust": 8.48,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "nubes",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635458400,
        "temp": 25.83,
        "feels_like": 26.01,
        "pressure": 1019,
        "humidity": 59,
        "dew_point": 17.23,
        "uvi": 0.16,
        "clouds": 96,
        "visibility": 10000,
        "wind_speed": 4.48,
        "wind_deg": 75,
        "wind_gust": 9.94,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "nubes",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635462000,
        "temp": 24.03,
        "feels_like": 24.26,
        "pressure": 1019,
        "humidity": 68,
        "dew_point": 17.63,
        "uvi": 0,
        "clouds": 97,
        "visibility": 10000,
        "wind_speed": 4.03,
        "wind_deg": 84,
        "wind_gust": 10.31,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "nubes",
            "icon": "04n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635465600,
        "temp": 23.16,
        "feels_like": 23.36,
        "pressure": 1020,
        "humidity": 70,
        "dew_point": 17.42,
        "uvi": 0,
        "clouds": 95,
        "visibility": 10000,
        "wind_speed": 3.73,
        "wind_deg": 84,
        "wind_gust": 11.04,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "nubes",
            "icon": "04n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635469200,
        "temp": 22.94,
        "feels_like": 23.14,
        "pressure": 1020,
        "humidity": 71,
        "dew_point": 17.38,
        "uvi": 0,
        "clouds": 61,
        "visibility": 10000,
        "wind_speed": 3.97,
        "wind_deg": 67,
        "wind_gust": 12.61,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "muy nuboso",
            "icon": "04n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635472800,
        "temp": 22.98,
        "feels_like": 23.08,
        "pressure": 1021,
        "humidity": 67,
        "dew_point": 16.6,
        "uvi": 0,
        "clouds": 72,
        "visibility": 10000,
        "wind_speed": 3.99,
        "wind_deg": 45,
        "wind_gust": 12.35,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "muy nuboso",
            "icon": "04n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635476400,
        "temp": 22.41,
        "feels_like": 22.46,
        "pressure": 1020,
        "humidity": 67,
        "dew_point": 15.85,
        "uvi": 0,
        "clouds": 63,
        "visibility": 10000,
        "wind_speed": 3.6,
        "wind_deg": 43,
        "wind_gust": 11.95,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "muy nuboso",
            "icon": "04n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635480000,
        "temp": 21.82,
        "feels_like": 21.78,
        "pressure": 1020,
        "humidity": 66,
        "dew_point": 15.2,
        "uvi": 0,
        "clouds": 49,
        "visibility": 10000,
        "wind_speed": 3.81,
        "wind_deg": 49,
        "wind_gust": 11.8,
        "weather": [
          {
            "id": 802,
            "main": "Clouds",
            "description": "nubes dispersas",
            "icon": "03n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635483600,
        "temp": 21.1,
        "feels_like": 20.99,
        "pressure": 1020,
        "humidity": 66,
        "dew_point": 14.51,
        "uvi": 0,
        "clouds": 41,
        "visibility": 10000,
        "wind_speed": 4.02,
        "wind_deg": 47,
        "wind_gust": 12.29,
        "weather": [
          {
            "id": 802,
            "main": "Clouds",
            "description": "nubes dispersas",
            "icon": "03n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635487200,
        "temp": 20.44,
        "feels_like": 20.26,
        "pressure": 1019,
        "humidity": 66,
        "dew_point": 13.77,
        "uvi": 0,
        "clouds": 35,
        "visibility": 10000,
        "wind_speed": 4.13,
        "wind_deg": 49,
        "wind_gust": 12.28,
        "weather": [
          {
            "id": 802,
            "main": "Clouds",
            "description": "nubes dispersas",
            "icon": "03n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635490800,
        "temp": 19.63,
        "feels_like": 19.42,
        "pressure": 1020,
        "humidity": 68,
        "dew_point": 13.55,
        "uvi": 0,
        "clouds": 6,
        "visibility": 10000,
        "wind_speed": 3.5,
        "wind_deg": 47,
        "wind_gust": 11.47,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "cielo claro",
            "icon": "01n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635494400,
        "temp": 18.95,
        "feels_like": 18.73,
        "pressure": 1020,
        "humidity": 70,
        "dew_point": 13.4,
        "uvi": 0,
        "clouds": 6,
        "visibility": 10000,
        "wind_speed": 3.63,
        "wind_deg": 56,
        "wind_gust": 11.68,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "cielo claro",
            "icon": "01n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635498000,
        "temp": 18.36,
        "feels_like": 18.08,
        "pressure": 1020,
        "humidity": 70,
        "dew_point": 12.92,
        "uvi": 0,
        "clouds": 9,
        "visibility": 10000,
        "wind_speed": 3.34,
        "wind_deg": 60,
        "wind_gust": 10.76,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "cielo claro",
            "icon": "01d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635501600,
        "temp": 18.87,
        "feels_like": 18.54,
        "pressure": 1020,
        "humidity": 66,
        "dew_point": 12.32,
        "uvi": 0.21,
        "clouds": 11,
        "visibility": 10000,
        "wind_speed": 3.51,
        "wind_deg": 63,
        "wind_gust": 10.25,
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "algo de nubes",
            "icon": "02d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635505200,
        "temp": 20.24,
        "feels_like": 19.73,
        "pressure": 1020,
        "humidity": 54,
        "dew_point": 10.63,
        "uvi": 0.96,
        "clouds": 23,
        "visibility": 10000,
        "wind_speed": 4.49,
        "wind_deg": 52,
        "wind_gust": 9.41,
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "algo de nubes",
            "icon": "02d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635508800,
        "temp": 21.7,
        "feels_like": 21.15,
        "pressure": 1020,
        "humidity": 47,
        "dew_point": 9.64,
        "uvi": 2.48,
        "clouds": 28,
        "visibility": 10000,
        "wind_speed": 4.46,
        "wind_deg": 49,
        "wind_gust": 8.36,
        "weather": [
          {
            "id": 802,
            "main": "Clouds",
            "description": "nubes dispersas",
            "icon": "03d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635512400,
        "temp": 22.98,
        "feels_like": 22.46,
        "pressure": 1020,
        "humidity": 43,
        "dew_point": 9.42,
        "uvi": 4.69,
        "clouds": 3,
        "visibility": 10000,
        "wind_speed": 4.42,
        "wind_deg": 52,
        "wind_gust": 7.67,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "cielo claro",
            "icon": "01d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635516000,
        "temp": 24.56,
        "feels_like": 24.12,
        "pressure": 1019,
        "humidity": 40,
        "dew_point": 9.43,
        "uvi": 6.99,
        "clouds": 7,
        "visibility": 10000,
        "wind_speed": 4.04,
        "wind_deg": 54,
        "wind_gust": 6.93,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "cielo claro",
            "icon": "01d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635519600,
        "temp": 25.87,
        "feels_like": 25.5,
        "pressure": 1019,
        "humidity": 38,
        "dew_point": 9.88,
        "uvi": 8.71,
        "clouds": 15,
        "visibility": 10000,
        "wind_speed": 4.03,
        "wind_deg": 61,
        "wind_gust": 6.4,
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "algo de nubes",
            "icon": "02d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635523200,
        "temp": 26.76,
        "feels_like": 26.6,
        "pressure": 1018,
        "humidity": 38,
        "dew_point": 10.82,
        "uvi": 9.36,
        "clouds": 15,
        "visibility": 10000,
        "wind_speed": 4.43,
        "wind_deg": 70,
        "wind_gust": 6.52,
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "algo de nubes",
            "icon": "02d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635526800,
        "temp": 27.25,
        "feels_like": 27.05,
        "pressure": 1017,
        "humidity": 40,
        "dew_point": 11.89,
        "uvi": 8.6,
        "clouds": 16,
        "visibility": 10000,
        "wind_speed": 4.35,
        "wind_deg": 74,
        "wind_gust": 6.21,
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "algo de nubes",
            "icon": "02d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635530400,
        "temp": 27.48,
        "feels_like": 27.35,
        "pressure": 1016,
        "humidity": 42,
        "dew_point": 12.84,
        "uvi": 6.75,
        "clouds": 26,
        "visibility": 10000,
        "wind_speed": 4.56,
        "wind_deg": 78,
        "wind_gust": 6.42,
        "weather": [
          {
            "id": 802,
            "main": "Clouds",
            "description": "nubes dispersas",
            "icon": "03d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635534000,
        "temp": 27.3,
        "feels_like": 27.32,
        "pressure": 1015,
        "humidity": 44,
        "dew_point": 13.71,
        "uvi": 4.42,
        "clouds": 63,
        "visibility": 10000,
        "wind_speed": 4.56,
        "wind_deg": 80,
        "wind_gust": 6.77,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "muy nuboso",
            "icon": "04d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635537600,
        "temp": 26.78,
        "feels_like": 27.11,
        "pressure": 1014,
        "humidity": 48,
        "dew_point": 14.52,
        "uvi": 2.28,
        "clouds": 37,
        "visibility": 10000,
        "wind_speed": 4.6,
        "wind_deg": 85,
        "wind_gust": 6.96,
        "weather": [
          {
            "id": 802,
            "main": "Clouds",
            "description": "nubes dispersas",
            "icon": "03d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635541200,
        "temp": 25.36,
        "feels_like": 25.39,
        "pressure": 1014,
        "humidity": 55,
        "dew_point": 15.4,
        "uvi": 0.82,
        "clouds": 29,
        "visibility": 10000,
        "wind_speed": 4.84,
        "wind_deg": 86,
        "wind_gust": 7.72,
        "weather": [
          {
            "id": 802,
            "main": "Clouds",
            "description": "nubes dispersas",
            "icon": "03d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635544800,
        "temp": 23.25,
        "feels_like": 23.3,
        "pressure": 1014,
        "humidity": 64,
        "dew_point": 16.03,
        "uvi": 0.17,
        "clouds": 24,
        "visibility": 10000,
        "wind_speed": 4.43,
        "wind_deg": 88,
        "wind_gust": 9.42,
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "algo de nubes",
            "icon": "02d"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635548400,
        "temp": 22.17,
        "feels_like": 22.27,
        "pressure": 1014,
        "humidity": 70,
        "dew_point": 16.49,
        "uvi": 0,
        "clouds": 21,
        "visibility": 10000,
        "wind_speed": 4.31,
        "wind_deg": 87,
        "wind_gust": 11.1,
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "algo de nubes",
            "icon": "02n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635552000,
        "temp": 22.23,
        "feels_like": 22.39,
        "pressure": 1015,
        "humidity": 72,
        "dew_point": 17.03,
        "uvi": 0,
        "clouds": 20,
        "visibility": 10000,
        "wind_speed": 4.08,
        "wind_deg": 83,
        "wind_gust": 11.03,
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "algo de nubes",
            "icon": "02n"
          }
        ],
        "pop": 0
      },
      {
        "dt": 1635555600,
        "temp": 22.24,
        "feels_like": 22.4,
        "pressure": 1015,
        "humidity": 72,
        "dew_point": 16.94,
        "uvi": 0,
        "clouds": 9,
        "visibility": 10000,
        "wind_speed": 4.43,
        "wind_deg": 72,
        "wind_gust": 11.27,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "cielo claro",
            "icon": "01n"
          }
        ],
        "pop": 0
      }
    ]
  }
}`

const dJSON = JSON.parse(data)
