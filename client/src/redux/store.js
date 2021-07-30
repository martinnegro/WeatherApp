import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from "./reducer"
import reduxThunk from "redux-thunk";

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(reduxThunk),
));

export default store;