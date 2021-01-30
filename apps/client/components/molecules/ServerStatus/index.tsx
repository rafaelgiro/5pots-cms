import clsx from "clsx";

import FaCheckCircle from "@meronex/icons/fa/FaCheckCircle";
import FaTimesCircle from "@meronex/icons/fa/FaTimesCircle";

import Typography from "../../atoms/Typography";

import styles from "./styles.module.scss";

const ServerStatus = () => {
  return (
    <div className={styles["server-status"]}>
      <Typography className={styles.sidebar__title} component="h4" variant="h4">
        Status do Servidor
      </Typography>
      <div className={styles["server-status__servers"]}>
        <div>
          <Typography component="p" variant="p">
            <FaCheckCircle
              className={clsx(
                styles["server-status__icon"],
                styles["server-status__icon--online"]
              )}
            />
            <span className={styles["server-status__server-name"]}>
              Brasil -{" "}
            </span>
            Online
          </Typography>
        </div>
        <div>
          <Typography component="p" variant="p">
            <FaTimesCircle
              className={clsx(
                styles["server-status__icon"],
                styles["server-status__icon--offline"]
              )}
            />
            <span className={styles["server-status__server-name"]}>PBE - </span>
            Offline
          </Typography>
          <Typography
            className={styles["server-status__time-ago"]}
            component="p"
            variant="sub"
          >
            1 hora atrás
          </Typography>
          <Typography
            className={styles["server-status__desc"]}
            component="p"
            variant="p"
          >
            O servidor do PBE ficará indisponível por 2 horas enquanto é
            trabalhado em uma manutenção
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ServerStatus;
