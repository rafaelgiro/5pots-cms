import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./organisms/Header";

import Homepage from "./templates/Homepage";
import AuthPage from "./templates/AuthPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/auth/:action/:credential?">
          <AuthPage />
        </Route>
        <Route exact path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
