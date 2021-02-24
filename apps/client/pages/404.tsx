import Typography from "../components/atoms/Typography";
import styles from "./styles.module.scss";

const BateuNaPortaDaPortaErrada = () => {
  return (
    <div className={styles["not-found-page"]}>
      <div className={styles["not-found-page__content"]}>
        <Typography component="h2" variant="h1">
          404
        </Typography>
        <Typography component="h4" variant="h4">
          Você precisa de um mapa
        </Typography>
        <Typography component="p" variant="p">
          A página que você está tentando acessar não existe.
        </Typography>
      </div>
      <div className={styles["not-found-page__right-image"]} />
    </div>
  );
};

export default BateuNaPortaDaPortaErrada;
