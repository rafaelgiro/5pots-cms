import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavItem = props => {
  const { link, children } = props;
  return (
    <Link className="header__link" to={link}>
      <li>{children}</li>
    </Link>
  );
};

NavItem.propTypes = {
  // Link para onde o usuário vai ser redirecionado
  link: PropTypes.string.isRequired,
  // Label do link na navegação
  children: PropTypes.node.isRequired
};

export default NavItem;
