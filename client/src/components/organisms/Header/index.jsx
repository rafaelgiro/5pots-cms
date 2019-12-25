import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../atoms/Logo";
import HeaderNav from "../../molecules/HeaderNav";
import HeaderSearchbar from "../../atoms/HeaderSearchbar";

const Header = () => {
  return (
    <header className="header">
      <div className="header__left-actions">
        <Link to="/">
          <Logo className="header__logo" />
        </Link>
        <HeaderSearchbar />
      </div>

      <HeaderNav />

      <div className="header__auth-links">
        <Link className="header__link" to="/auth/login">
          Login
        </Link>
        <Link className="header__link" to="/auth/register">
          Registrar
        </Link>
      </div>
    </header>
  );
};

export default Header;
