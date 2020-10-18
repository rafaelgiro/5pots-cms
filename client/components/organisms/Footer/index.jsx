/* eslint-disable react/jsx-one-expression-per-line */

import { FaGithub } from "react-icons/fa";

import Logo from "../../atoms/Logo";
import Typography from "../../atoms/Typography";

import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer__logo-container"]}>
        <Logo className={styles.footer__logo} />
        <Typography className={styles.footer__5pots} component="p" variant="h1">
          SION TE AMO
        </Typography>
      </div>
      <div className={styles.footer__links}>
        <a href="https://git.io/5pots">
          <Typography className={styles.footer__link} component="p" variant="p">
            A 5Pots é open-source!
          </Typography>
          <Typography className={styles.footer__link} component="p" variant="p">
            https://git.io/5pots <FaGithub />
          </Typography>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
