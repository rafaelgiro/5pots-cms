import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const loginGallery = [
  "https://i.imgur.com/M9dYyaU.jpg",
  "https://i.imgur.com/NKQhPdG.jpg",
  "https://i.imgur.com/TpDGGtp.jpg",
  "https://i.imgur.com/adyjByb.jpg",
  "https://i.imgur.com/H8dbHe4.jpg",
  "https://i.imgur.com/iX9pyAR.jpg",
];

const AuthPage = (props) => {
  const { children } = props;
  return (
    <div className={styles["auth-page"]}>
      <h2 className={styles["auth-page__sion-te-amo"]}>Sion te amo</h2>
      {children}
      <img
        src={loginGallery[Math.ceil(Math.random() * loginGallery.length) - 1]}
        alt="Imagem de Login"
        className={styles["auth-page__right-image"]}
      />
    </div>
  );
};

AuthPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthPage;
