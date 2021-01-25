//@flow
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./redux/store";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

const root = document.getElementById("root");

if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>,
    root
  );
}

registerServiceWorker();
