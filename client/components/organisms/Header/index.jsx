import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { MdNotificationsNone } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import clsx from "clsx";

import Logo from "../../atoms/Logo";
import Typography from "../../atoms/Typography";
import MenuButton from "./MenuButton";
import HeaderNav from "./Nav";
import HeaderSearchbar from "./SearchBar";

import AuthContext from "../../../core/contexts/AuthContext";

import styles from "./styles.module.scss";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [onTop, setOnTop] = useState(true);

  const authLinksClass = clsx(
    styles["header__auth-links"],
    !onTop && styles["header__auth-links--hidden"]
  );

  const profileClass = clsx(
    styles.header__user,
    !onTop && styles["header__user--hidden"]
  );

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
        <div className={styles["header__profile-menu"]}>
          <MenuButton onTop={onTop} />
          <div className={profileClass}>
            <MdNotificationsNone
              className={styles.header__user__notifications}
            />
            <div className={styles.header__user__picture} />
            <div className={styles.header__user__details}>
              <Typography
                className={styles["header__user__details__display-name"]}
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
              <FiLogOut className={styles.header__user__logout} />
            </a>
          </div>
        </div>
      );

    return (
      <div className={styles.header__cta}>
        <div className={authLinksClass}>
          <Link href="/auth/login">
            <a className={styles.header__link}>Login</a>
          </Link>
          <Link href="/auth/register">
            <a className={styles.header__link}>Registrar</a>
          </Link>
        </div>
        <MenuButton onTop={onTop} />
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <header className={styles.header}>
        <div className={styles["header__left-actions"]}>
          <Link href="/">
            <a>
              <Logo className={styles.header__logo} />
            </a>
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
