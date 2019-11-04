import React from "react";
import NavItem from "../../atoms/NavItem";

const Nav = () => {
  return (
    <nav>
      <ul className="header__nav">
        <NavItem link="/categoria/pbe">PBE</NavItem>
        <NavItem link="/categoria/noticias">Notícias</NavItem>
        <NavItem link="/categoria/guias">Guias</NavItem>
        <NavItem link="/categoria/artigos">Artigos</NavItem>
        <NavItem link="/faq">FAQ</NavItem>
      </ul>
    </nav>
  );
};

export default Nav;
