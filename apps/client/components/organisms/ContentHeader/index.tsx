import { useContext, useState, useEffect, useReducer } from "react";
import Link from "next/link";
import clsx from "clsx";

import MdNotificationsNone from "@meronex/icons/md/MdNotificationsNone";
import FiLogOut from "@meronex/icons/fi/FiLogOut";

import MenuButton from "../Header/MenuButton";
import Typography from "../../atoms/Typography";
import Tabs from "../../atoms/Tabs/Tabs";
import TabItem from "../../atoms/Tabs/TabItem";
import Logo from "../../atoms/Logo";
import ChampionIcon from "../../atoms/ChampionIcon";

import AuthContext from "../../../core/contexts/AuthContext";
import PostContext from "../../../core/contexts/PostContext";
import UIContext from "../../../core/contexts/UIContext";

import { ContentHeaderProps } from "./interfaces";

import styles from "./styles.module.scss";
import headerStyles from "../Header/styles.module.scss";

const ContentHeader = (props: ContentHeaderProps) => {
  const { titles, title, type } = props;
  const { uiState: state } = useContext(UIContext);
  const { user } = useContext(AuthContext);
  const { postContent } = useContext(PostContext);
  const [active, setActive] = useState(false);
  const { menu } = state;

  const className = clsx(
    styles["content-header"],
    menu && styles["content-header--hidden"]
  );
  const navClass = clsx(
    styles["content-header__secondary-nav"],
    active && styles["content-header__secondary-nav--active"]
  );

  const renderTitles = () => {
    return titles?.map((sectionTitle) => (
      <div key={sectionTitle} className={styles["content-header__title"]}>
        {type === "patch-notes" && (
          <Tabs>
            <TabItem title="Campeões" icon="champions">
              <div className={styles["content-header__champions"]}>
                {postContent?.champions?.map((champ) => (
                  <a
                    key={`content-header-anchor-${champ.name}`}
                    href={`#${champ.name}`}
                  >
                    <ChampionIcon
                      key={`nav-summary-${champ.name}`}
                      name={champ.name}
                      small
                    />
                  </a>
                ))}
              </div>
            </TabItem>
            <TabItem title="Skins" icon="skins">
              <div className={styles["content-header__skins"]}>
                {postContent?.skins?.map((skin) => (
                  <img
                    key={`content-skin-anchor-${skin.id}`}
                    src={`https://assets.5pots.com/file/cincopots/splash/${skin.id}.jpg`}
                    width="102"
                    alt="Splash skin"
                  />
                ))}
              </div>
            </TabItem>
          </Tabs>
        )}
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
      ?.querySelectorAll("h2, h3, h4, h5, h6") as NodeListOf<HTMLElement>;

    titlesEl?.forEach((el) =>
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
            tabIndex={0}
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

export default ContentHeader;
