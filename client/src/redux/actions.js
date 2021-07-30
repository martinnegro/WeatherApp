import axios from 'axios';
export const FETCH_CITY  = 'FETCH_CITY';
export const IS_FETCHING = 'IS_FETCHING';

export function fetchCity(city) {
    return function (dispatch) {
        dispatch(isFetching());
        return axios.get(`https://server-weatherapp.herokuapp.com/api?city=${city}`)
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
                        payload: city
                    })
                }
            });
    }
}

export function isFetching() {
    return {
        type: IS_FETCHING
    }
}