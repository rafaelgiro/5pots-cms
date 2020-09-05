import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import NavItem from "../../atoms/NavItem";

const Nav = (props) => {
  const { isVisible } = props;

  const className = clsx("header__nav", !isVisible && "header__nav--hidden");

  return (
    <nav>
      <ul className={className}>
        <NavItem link="/categoria/pbe">PBE</NavItem>
        <NavItem link="/categoria/noticias">Notícias</NavItem>
        <NavItem link="/categoria/guias">Guias</NavItem>
        <NavItem link="/categoria/artigos">Artigos</NavItem>
        <NavItem link="/faq">FAQ</NavItem>
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  isVisible: PropTypes.bool,
};

Nav.defaultProps = {
  isVisible: true,
};

export default Nav;
