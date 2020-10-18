import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import PropTypes, { string } from "prop-types";
import clsx from "clsx";
import { MdNotificationsNone } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

import UIContext from "../../../core/contexts/UIContext";
import AuthContext from "../../../core/contexts/AuthContext";
import Typography from "../../atoms/Typography";
import MenuButton from "../Header/MenuButton";

import Logo from "../../atoms/Logo";

import styles from "./styles.module.scss";
import headerStyles from "../Header/styles.module.scss";

const ContentHeader = ({ titles, title }) => {
  const { menu } = useContext(UIContext).state;
  const { user } = useContext(AuthContext);
  const [active, setActive] = useState(false);
  const className = clsx(
    styles["content-header"],
    menu && styles["content-header--hidden"]
  );
  const navClass = clsx(
    styles["content-header__secondary-nav"],
    active && styles["content-header__secondary-nav--active"]
  );

  const renderTitles = () => {
    return titles.map((sectionTitle) => (
      <div key={sectionTitle} className={styles["content-header__title"]}>
        <a
          // scroll={(el) => {
          //   const yOffset = -128;
          //   const y =
          //     el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          //   window.scrollTo({ top: y, behavior: "smooth" });
          //   setActive(false);
          // }}
          href={`#${sectionTitle.replace(/,? /gi, "-").toLowerCase()}`}
        >
          <Typography component="p" variant="p">
            {sectionTitle}
          </Typography>
        </a>
      </div>
    ));
  };

  const renderAuth = () => {
    if (user)
      return (
        <div className={headerStyles["header__profile-menu"]}>
          <MenuButton dark />
          <div
            className={clsx(
              headerStyles.header__user,
              headerStyles["header__user--hidden"]
            )}
          >
            <MdNotificationsNone
              className={clsx(
                headerStyles.header__user__notifications,
                headerStyles["header__user__notifications--dark"]
              )}
            />
            <div className={headerStyles.header__user__picture} />
            <div className={headerStyles.header__user__details}>
              <Typography
                className={headerStyles["header__user__details__display-name"]}
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
              <FiLogOut className={headerStyles.header__user__logout} />
            </a>
          </div>
        </div>
      );

    return <MenuButton dark />;
  };

  useEffect(() => {
    const titlesEl = document
      .querySelector("article")
      .querySelectorAll("h2, h3, h4, h5, h6");

    titlesEl.forEach((el) =>
      el.setAttribute("id", el.innerText.replace(/,? /gi, "-").toLowerCase())
    );
  }, []);

  return (
    <>
      <header className={className}>
        <div className={styles["content-header__content"]}>
          <Link href="/">
            <a>
              <Logo className={styles["content-header__logo"]} />
            </a>
          </Link>
          <div
            className={styles["content-header__titles-container"]}
            onClick={() => setActive(!active)}
            tabIndex="0"
            role="button"
            onKeyDown={() => setActive(!active)}
          >
            <div className={styles["content-header__content__menu"]}>
              <svg
                viewBox="0 0 88 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27 9L51 33L27 57L3 33L27 9Z"
                  stroke="#F7F6F4"
                  strokeWidth="4"
                />
                <path
                  d="M61 57L37 33L61 9L85 33L61 57Z"
                  stroke="#F7F6F4"
                  strokeWidth="4"
                />
                <rect
                  x="43.9409"
                  y="5"
                  width="40"
                  height="40"
                  transform="rotate(45 43.9409 5)"
                  fill="#3C353D"
                  stroke="#F7F6F4"
                  strokeWidth="5"
                />
              </svg>
            </div>
            {/* {titles && renderTitles()} */}
            <div className={styles["content-header__title"]}>
              <Typography component="p" variant="p">
                {title}
              </Typography>
            </div>
          </div>
          {renderAuth()}
        </div>
      </header>
      <div className={navClass}>{renderTitles()}</div>
    </>
  );
};

ContentHeader.propTypes = {
  titles: PropTypes.arrayOf(string).isRequired,
  title: PropTypes.string.isRequired,
};

export default ContentHeader;
