import { combineReducers } from "redux";
import cities from './cities';
import currentlocation from "./currentlocation";

export default combineReducers({
    cities,
    currentlocation
})