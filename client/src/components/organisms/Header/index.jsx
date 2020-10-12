import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdNotificationsNone } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import clsx from "clsx";

import Logo from "../../atoms/Logo";
import HeaderNav from "../../molecules/HeaderNav";
import HeaderSearchbar from "../../atoms/HeaderSearchbar";
import AuthContext from "../../../contexts/AuthContext";
import Typography from "../../atoms/Typography";
import MenuButton from "./MenuButton";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [onTop, setOnTop] = useState(true);

  const authLinksClass = clsx(
    "header__auth-links",
    !onTop && "header__auth-links--hidden"
  );

  const profileClass = clsx("header__user", !onTop && "header__user--hidden");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) setOnTop(true);
      else setOnTop(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onTop]);

  const renderAuth = () => {
    if (user)
      return (
        <div className="header__profile-menu">
          <MenuButton onTop={onTop} />
          <div className={profileClass}>
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
              <Typography variant="sub" component="p">
                Configurar Perfil
              </Typography>
            </div>
            <a href="/api/logout">
              <FiLogOut className="header__user__logout" />
            </a>
          </div>
        </div>
      );

    return (
      <div className="header__cta">
        <div className={authLinksClass}>
          <Link className="header__link" to="/auth/login">
            Login
          </Link>
          <Link className="header__link" to="/auth/register">
            Registrar
          </Link>
        </div>
        <MenuButton onTop={onTop} />
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
          <HeaderSearchbar isVisible={onTop} />
        </div>

        <HeaderNav isVisible={onTop} />

        {renderAuth()}
      </header>
    );
  };

  return <>{renderHeader()}</>;
};

export default Header;
