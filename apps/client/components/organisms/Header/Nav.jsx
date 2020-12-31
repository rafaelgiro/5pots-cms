import Link from "next/link";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./nav.styles.module.scss";
import headerStyles from "./styles.module.scss";

const Nav = (props) => {
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

const NavItem = (props) => {
  const { link, children } = props;
  return (
    <Link href={link}>
      <a className={headerStyles.header__link}>
        <li>{children}</li>
      </a>
    </Link>
  );
};

NavItem.propTypes = {
  // Link para onde o usuário vai ser redirecionado
  link: PropTypes.string.isRequired,
  // Label do link na navegação
  children: PropTypes.node.isRequired,
};

Nav.propTypes = {
  isVisible: PropTypes.bool,
};

Nav.defaultProps = {
  isVisible: true,
};

export default Nav;
