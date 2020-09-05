import React, { useContext, useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import PropTypes, { string } from "prop-types";
import clsx from "clsx";

import UIContext from "../../../contexts/UIContext";
import Typography from "../../atoms/Typography";
import MenuButton from "../Header/MenuButton";

import Logo from "../../atoms/Logo";

const ContentHeader = ({ titles, title }) => {
  const { menu } = useContext(UIContext).state;
  const [active, setActive] = useState(false);
  const className = clsx("content-header", menu && "content-header--hidden");
  const navClass = clsx(
    "content-header__secondary-nav",
    active && "content-header__secondary-nav--active"
  );

  const renderTitles = () => {
    return titles.map((sectionTitle) => (
      <div key={sectionTitle} className="content-header__title">
        <HashLink
          scroll={(el) => {
            const yOffset = -128;
            const y =
              el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
            setActive(false);
          }}
          to={`#${sectionTitle.replace(/,? /gi, "-").toLowerCase()}`}
        >
          <Typography component="p" variant="p">
            {sectionTitle}
          </Typography>
        </HashLink>
      </div>
    ));
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
        <div className="content-header__content">
          <Link to="/">
            <Logo className="content-header__logo" />
          </Link>
          <div
            className="content-header__titles-container"
            onClick={() => setActive(!active)}
            tabIndex="0"
            role="button"
            onKeyDown={() => setActive(!active)}
          >
            <div className="content-header__content__menu">
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
            <div className="content-header__title">
              <Typography component="p" variant="p">
                {title}
              </Typography>
            </div>
          </div>
          <MenuButton dark />
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
