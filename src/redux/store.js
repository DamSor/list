// @flow
import { applyMiddleware, createStore, compose } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";

import reducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunkMiddleware, logger);
const store = createStore(reducer, composeEnhancers(middleware));

export { store };

export default store;
