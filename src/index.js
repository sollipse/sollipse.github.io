import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import About from "./About";
import Work from "./Work";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/work" component={Work} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
