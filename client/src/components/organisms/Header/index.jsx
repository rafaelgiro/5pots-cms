import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdNotificationsNone } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

import Logo from "../../atoms/Logo";
import HeaderNav from "../../molecules/HeaderNav";
import HeaderSearchbar from "../../atoms/HeaderSearchbar";
import AuthContext from "../../../contexts/AuthContext";
import Typography from "../../atoms/Typography";

const Header = () => {
  const { user } = useContext(AuthContext);

  const renderAuth = () => {
    if (user)
      return (
        <div className="header__user">
          <MdNotificationsNone className="header__user__notifications" />
          <div className="header__user__picture" />
          <div className="header__user__details">
            <Typography
              className="header__user__details__display-name"
              variant="h4"
              component="p"
            >
              {user.displayName}
            </Typography>
            <Typography variant="p" component="p">
              datFranky
            </Typography>
          </div>
          <a href="/api/logout">
            <FiLogOut className="header__user__logout" />
          </a>
        </div>
      );

    return (
      <div className="header__auth-links">
        <Link className="header__link" to="/auth/login">
          Login
        </Link>
        <Link className="header__link" to="/auth/register">
          Registrar
        </Link>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <header className="header">
        <div className="header__left-actions">
          <Link to="/">
            <Logo className="header__logo" />
          </Link>
          <HeaderSearchbar />
        </div>

        <HeaderNav />

        {renderAuth()}
      </header>
    );
  };

  return <>{renderHeader()}</>;
};

export default Header;
