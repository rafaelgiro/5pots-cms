import styles from "./styles.module.scss";

const loginGallery = [
  "https://f002.backblazeb2.com/file/cincopots/posts/ezreal.jpg",
  "https://f002.backblazeb2.com/file/cincopots/posts/kaisa.jpg",
  "https://f002.backblazeb2.com/file/cincopots/posts/mf.jpg",
  "https://f002.backblazeb2.com/file/cincopots/posts/nunu.jpg",
  "https://f002.backblazeb2.com/file/cincopots/posts/sg.jpg",
  "https://f002.backblazeb2.com/file/cincopots/posts/yordles.jpg",
];

const AuthPage: React.FC = (props) => {
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

export default AuthPage;
