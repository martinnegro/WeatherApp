import { IS_FETCHING, FETCH_CITY, CLOSE_CITY, FETCH_ERROR } from "./actions";

const initialState = [];

export default function reducer(state = initialState,{type, payload}) {
    let aux;
    switch(type) {
        case IS_FETCHING:
            aux = {isFetching: true, id: payload}
            return [...state, aux];
        case FETCH_CITY:
            aux = state.slice();
            if (aux.some(c => c.id === payload.city.id)) payload.city = { isPresent: true, message: 'La ciudad ya está cargada!'}
            aux = aux.map(c => {
                if (c.id === payload.id) {
                    return payload.city
                } else {
                    return c
                }});
            return aux;
        case FETCH_ERROR:
            aux = state.slice();
            aux = aux.map(c => {
                if (c.id === payload.id) {
                    return {isError: true, message: 'No se encontró la ciudad   ', id: payload.id}
                } else {
                    return c
                }});
            return aux
        case CLOSE_CITY:
            aux = state.slice();
            aux = aux.filter(c => c.id !== payload);
            return aux;
        default:
            return state;
    }
}