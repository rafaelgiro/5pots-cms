import styles from "./styles.module.scss";

const AuthPage: React.FC = (props) => {
  const { children } = props;
  return (
    <div className={styles["auth-page"]}>
      <h2 className={styles["auth-page__sion-te-amo"]}>Sion te amo</h2>
      {children}
      <img
        src="https://f002.backblazeb2.com/file/cincopots/posts/sg.jpg"
        alt="Imagem de Login"
        className={styles["auth-page__right-image"]}
      />
    </div>
  );
};

export default AuthPage;
