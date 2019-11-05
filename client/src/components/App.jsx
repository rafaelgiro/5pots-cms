import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./templates/Homepage";
import Header from "./organisms/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
