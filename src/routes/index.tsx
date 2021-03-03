import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import routes from "./routes.enum";
import Welcome from "./Welcome";

export default function Routes() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to={routes.WELCOME} />
          </Route>
          <Route path={routes.WELCOME}>
              <Welcome />
          </Route>
        </Switch>
    </Router>
  );
}