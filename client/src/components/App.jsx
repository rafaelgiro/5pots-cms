import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import Header from "./organisms/Header";
import Homepage from "./templates/Homepage";
import AuthPage from "./templates/AuthPage";
import PostPage from "./templates/PostPage";

import AuthContext from "../contexts/AuthContext";
import api from "../services/api";
import Snackbar from "./atoms/Snackbar";
import FullScreenMenu from "./organisms/FullScreenMenu";

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
      <div className="header-offset">
        <ScrollToTop />
        <Switch>
          <Route path="/auth/:action/:credential?">
            <AuthPage />
          </Route>
          <Route path="/posts/:id">
            <PostPage />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </div>
      <Snackbar />
      <FullScreenMenu />
    </Router>
  );
};

function ScrollToTop() {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen((location) => {
      if (!location.hash) window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return null;
}
export default App;
