import { useContext, useEffect } from "react";

import Snackbar from "../../atoms/Snackbar";
import Header from "../../organisms/Header";
import FullScreenMenu from "../../organisms/FullScreenMenu";

import AuthContext from "../../../core/contexts/AuthContext";
import api from "../../../core/services/api";

const Layout: React.FC = (props) => {
  const { children } = props;
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    api.get("/current_user").then(({ data }) => {
      if (data && setUser) setUser(data);
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

export default Layout;
