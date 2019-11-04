import React from "react";

import { MdSearch } from "react-icons/md";

const Searchbar = () => {
  return (
    <form className="header__searchbar">
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

export default Searchbar;
