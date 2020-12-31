/* eslint-disable react/jsx-one-expression-per-line */
import MdArrowDropDown from "@meronex/icons/md/MdArrowDropDown";

import Typography from "../../atoms/Typography";

import styles from "./styles.module.scss";

const Controller = () => {
  return (
    <div className={styles.stories__controller}>
      <div>
        <Typography
          className={styles["stories__controller__sub-title"]}
          component="p"
          variant="p"
        >
          Últimas
        </Typography>
        <Typography
          className={styles.stories__controller__title}
          component="p"
          variant="p"
        >
          Notícias <MdArrowDropDown />
        </Typography>
      </div>
      <Typography
        className={styles.stories__controller__desc}
        component="p"
        variant="p"
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. A similique,
        odit sit explicabo tempora inventore asperiores non molestias mollitia.
      </Typography>
    </div>
  );
};

export default Controller;
