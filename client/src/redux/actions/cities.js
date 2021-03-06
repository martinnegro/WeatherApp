import axios from 'axios';
const { v4: uuidv4 } = require('uuid');

const { REACT_APP_URL_BACKEND } = process.env; 

export const FETCH_CITY  = 'FETCH_CITY';
export const IS_FETCHING_CITY = 'IS_FETCHING_CITY';
export const CLOSE_CITY  = 'CLOSE_CITY';
export const FETCH_ERROR = 'FETCH_ERROR';

export function fetchCity(city) {
    return function (dispatch) {
        const localID = uuidv4();
        dispatch(isFetchingCity(localID));
        return axios.get(`${REACT_APP_URL_BACKEND}/api?city=${city}`)
            .then(response => {
                if(response.data !== undefined){
                    const data = response.data
                    const city = {
                        min: Math.round(data.main.temp_min),
                        max: Math.round(data.main.temp_max),
                        img: data.weather[0].icon,
                        id: data.id,
                        wind: data.wind.speed,
                        temp: data.main.temp,
                        name: data.name,
                        weather: data.weather[0].description,
                        clouds: data.clouds.all,
                        latitud: data.coord.lat,
                        longitud: data.coord.lon
                    }
                    dispatch({
                        type: FETCH_CITY,
                        payload: { city, localID }
                    })
                }
            }).catch(err => dispatch({type: FETCH_ERROR, payload: { err, localID }}));
    }
}

export function isFetchingCity(payload) {
    return {
        type: IS_FETCHING_CITY,
        payload
    }
}

export function closeCity(payload) {
    return {
        type: CLOSE_CITY,
        payload
    }
}