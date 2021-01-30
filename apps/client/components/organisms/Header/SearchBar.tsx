import clsx from "clsx";

import MdSearch from "@meronex/icons/md/MdSearch";

import { NavProps } from "./interfaces";
import styles from "./search.styles.module.scss";

const Searchbar = (props: NavProps) => {
  const { isVisible } = props;

  const className = clsx(
    styles.searchbar,
    !isVisible && styles["searchbar--hidden"]
  );

  return (
    <form className={className}>
      <input
        className={styles.searchbar__input}
        type="text"
        placeholder="Procurar no site..."
      />
      <button className={styles.searchbar__button} type="submit">
        <MdSearch />
      </button>
    </form>
  );
};

export default Searchbar;
