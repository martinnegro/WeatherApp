import axios from 'axios';
const { REACT_APP_URL_BACKEND } = process.env; 

export const FETCH_CURRENT  = 'FETCH_CURRENT';
export const IS_FETCHING_CURRENT = 'IS_FETCHING_CURRENT';
export const FETCH_ERROR_CURRENT = 'FETCH_ERROR_CURRENT';
export const SET_COORD = 'SET_COORD';

export const fetchCurrent = (lat, lon) => {
    return (dispatch) => {
        dispatch(isFetchingCurrent());
        return axios.get(`${REACT_APP_URL_BACKEND}/api/currentlocation?lat=${lat}&lon=${lon}`)
                    .then(response => {
                        dispatch({
                            type: FETCH_CURRENT,
                            payload: response.data
                        })
                    }).catch(err => dispatch(fetchErrorCurrent(true, 'No se pudieron obtener los datos')))
    }
};

export const setCoord = (lat, lon) => {
    return {
        type: SET_COORD,
        payload: { lat, lon }
    }
}

export const isFetchingCurrent = () => {
    return {
        type: IS_FETCHING_CURRENT
    }
};

export const fetchErrorCurrent = (bool, message) => {
    return {
        type: FETCH_ERROR_CURRENT,
        payload: {
            state: bool,
            message
        }
    }
};