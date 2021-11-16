import {
    FETCH_CURRENT ,
    IS_FETCHING_CURRENT,
    FETCH_ERROR_CURRENT,
    SET_COORD
} from '../actions/currentlocation'

const initState = {
    isFetching: true,
    isError: false,
    coord: {
        lat: 0,
        lon: 0
    },
    name: '',
    current: {},
    forecast: {}
}

export default function currentlocation(state = initState, { type, payload }) {
    switch(type){
        case SET_COORD:
            return {
                ...state,
                isError: false,
                coord: {
                    lat: payload.lat,
                    lon: payload.lon
                },
                message: '',
            }
        case FETCH_CURRENT:
            return {
                ...state,
                isError: false,
                isFetching: false,
                current: payload.current,
                forecast: payload.forecast,
                message: ''
            };
        case IS_FETCHING_CURRENT:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_ERROR_CURRENT:
            return {
                ...state,
                isFetching: false,
                isError: payload.state,
                message: payload.message
            };   
        default:
            return state;
    }
}