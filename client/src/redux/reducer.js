import { IS_FETCHING, FETCH_CITY } from "./actions";

const initialState = [];

export default function reducer(state = initialState,{type, payload}) {
    let aux;
    switch(type) {
        case IS_FETCHING:
            aux = {isFetching: true}
            return [...state, aux];
        case FETCH_CITY:
            aux = state.slice();
            aux[aux.length - 1] = payload;
            return aux;        
        default:
            return state;
    }
}