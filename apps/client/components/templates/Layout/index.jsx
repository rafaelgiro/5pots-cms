import { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import Snackbar from "../../atoms/Snackbar";
import Header from "../../organisms/Header";
import FullScreenMenu from "../../organisms/FullScreenMenu";

import AuthContext from "../../../core/contexts/AuthContext";
import api from "../../../core/services/api";

const Layout = (props) => {
  const { children } = props;
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    api.get("/current_user").then(({ data }) => {
      if (data) setUser(data);
    });
  }, [setUser]);
  return (
    <>
      <Header />
      <div className="header-offset">{children}</div>
      <Snackbar />
      <FullScreenMenu />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
