import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { MdSearch } from "react-icons/md";

const Searchbar = (props) => {
  const { isVisible } = props;

  const className = clsx(
    "header__searchbar",
    !isVisible && "header__searchbar--hidden"
  );

  return (
    <form className={className}>
      <input
        className="header__searchbar__input"
        type="text"
        placeholder="Procurar no site..."
      />
      <button className="header__searchbar__button" type="submit">
        <MdSearch />
      </button>
    </form>
  );
};

Searchbar.propTypes = {
  isVisible: PropTypes.bool,
};

Searchbar.defaultProps = {
  isVisible: true,
};

export default Searchbar;
