import PropTypes from "prop-types";
import clsx from "clsx";

import { MdSearch } from "react-icons/md";

import styles from "./search.styles.module.scss";

const Searchbar = (props) => {
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

Searchbar.propTypes = {
  isVisible: PropTypes.bool,
};

Searchbar.defaultProps = {
  isVisible: true,
};

export default Searchbar;
