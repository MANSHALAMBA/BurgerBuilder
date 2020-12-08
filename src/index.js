import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import burgerReducer from "./store/reducers/burgerReducer";
import ordersReducer from "./store/reducers/ordersReducer";
import authreducer from "./store/reducers/authReducer";
import App from "./App";

import registerServiceWorker from "./registerServiceWorker";

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;
const rootReducer = combineReducers({
  brg: burgerReducer,
  ord: ordersReducer,
  auth: authreducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
