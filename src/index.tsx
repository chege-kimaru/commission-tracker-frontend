import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { StoreContext, store } from "./stores/store";

import 'bootstrap/dist/js/bootstrap.bundle';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <Router>
        <App />
      </Router>
    </StoreContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
