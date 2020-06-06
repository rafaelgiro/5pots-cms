import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./organisms/Header";
import Homepage from "./templates/Homepage";
import AuthPage from "./templates/AuthPage";

import AuthContext from "../contexts/AuthContext";
import api from "../services/api";

const App = () => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    api.get("/current_user").then(({ data }) => {
      if (data) setUser(data);
    });
  }, [setUser]);

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
