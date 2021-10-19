import { IS_FETCHING_CITY, FETCH_CITY, CLOSE_CITY, FETCH_ERROR } from "../actions/cities";

const initialState = [];
/*
[{ 
    localID: 1
    isFetching: true || false,
    isError: true || false,
    isPresent: true || false,
    message: '',
    data: {
        id: 1,
        name,
        ...
    }
}]
*/
export default function cities(state = initialState,{ type, payload }) {
    let aux;
    let stateTemp;
    switch(type) {
        case IS_FETCHING_CITY:
            aux = {
                isFetching: true,
                isPresent: false,
                isError: false,
                localID: payload,
                city: {}
            }
            return [...state, aux];
        case FETCH_CITY:
            stateTemp = state.slice();
            aux = {
                isFetching: false,
                isPresent: false,
                localID: payload.localID,
                city: payload.city
            }
            if (stateTemp.some( c => c.city.id === aux.city.id )) {
                aux.isPresent = true;
                aux.message = 'La ciudad ya se encuentra cargada';
                aux.localID = payload.localID
            }
            stateTemp = stateTemp.map( c => c.localID === aux.localID ? aux : c );       
            return stateTemp;
        case FETCH_ERROR:
            stateTemp = state.slice();
            stateTemp = stateTemp.map( c => {
                if (c.localID === payload.localID) {
                    return {
                        localID: payload.localID,
                        isError: true,
                        message: 'No se encontró la ciudad'
                    }
                }
                return c
            })
            return stateTemp;
        case CLOSE_CITY:
            stateTemp = state.slice();
            stateTemp = stateTemp.filter( c => c.localID !== payload);
            return stateTemp;
        default:
            return state;
    }
}