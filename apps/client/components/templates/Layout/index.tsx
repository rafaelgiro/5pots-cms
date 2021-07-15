import { useContext, useEffect } from "react";
import Cookies from "js-cookie";

import Snackbar from "../../atoms/Snackbar";
import Header from "../../organisms/Header";
import FullScreenMenu from "../../organisms/FullScreenMenu";

import AuthContext from "../../../core/contexts/AuthContext";
import api from "../../../core/services/api";
import parseJwt from "../../../core/helpers/parseJwt";
import { useRouter } from "next/router";
import Loadingbar from "../../atoms/Loadingbar";
import Lightbox from "../../atoms/Lightbox";

const Layout: React.FC = (props) => {
  const { children } = props;
  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  const items = [
    `https://assets.5pots.com/file/cincopots/pbe/blitz-groove-border.jpg`,
    `https://assets.5pots.com/file/cincopots/pbe/blitz-groove-splash.jpg`,
    `https://assets.5pots.com/file/cincopots/pbe/blitz-groove-still.jpg`,
    `https://assets.5pots.com/file/cincopots/pbe/blitz-groove-turn.jpg`,
  ];

  useEffect(() => {
    const { auth } = router.query;

    // Se for redeirecinamento o oAuth, pega o token no cookie
    if (auth) {
      const cookie = Cookies.get("x-auth-token") || "";
      const { token } = cookie && JSON.parse(cookie.replace("j:", ""));

      Cookies.remove("x-auth-token");
      if (token) {
        const user = parseJwt(token);
        localStorage.setItem("token", token);
        localStorage.setItem("expires", user.exp);
      }
    }

    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expires");

    // Se token expirou, remove do storage
    if (expirationDate && Number(expirationDate) > Date.now() / 100) {
      localStorage.removeItem("token");
      localStorage.removeItem("expires");
    } else if (token) {
      // Senão, renova o token
      api
        .post("/auth/refresh", {}, { headers: { Authorization: token } })
        .then(({ data }) => {
          const { token: newToken } = data;
          const user = parseJwt(newToken);

          localStorage.setItem("token", newToken);
          localStorage.setItem("expires", user.exp);

          setUser && setUser(user);
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("expires");
        });
    }
  }, [setUser, router]);
  return (
    <>
      <Loadingbar />
      <Header />
      <div className="header-offset">{children}</div>
      <Snackbar />
      <FullScreenMenu />
    </>
  );
};

export default Layout;
