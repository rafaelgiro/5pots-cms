import Link from "next/link";
import clsx from "clsx";

import { NavItemProps, NavProps } from "./interfaces";
import styles from "./nav.styles.module.scss";
import headerStyles from "./styles.module.scss";

const Nav = (props: NavProps) => {
  const { isVisible } = props;

  const className = clsx(styles.nav, !isVisible && styles["nav--hidden"]);

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

const NavItem = (props: NavItemProps) => {
  const { link, children } = props;
  return (
    <Link href={link}>
      <a className={headerStyles.header__link}>
        <li>{children}</li>
      </a>
    </Link>
  );
};

export default Nav;
