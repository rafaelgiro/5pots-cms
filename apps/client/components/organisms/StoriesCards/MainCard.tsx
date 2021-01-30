import Typography from "../../atoms/Typography";

import { StorieCardProps } from "./interfaces";
import styles from "./styles.module.scss";

const MainCard = (props: StorieCardProps) => {
  const { post } = props;
  return (
    <div className={styles["stories__main-card"]}>
      <div
        style={{ backgroundImage: `url(${post.image})` }}
        className={styles["stories__main-card__image"]}
      />
      <div className={styles["stories__main-card__info"]}>
        <div className={styles["stories__main-card__info__category"]}>
          <Typography component="p" variant="h4">
            {post.category}
          </Typography>
        </div>
        <Typography component="h3" variant="h4">
          {post.title}
        </Typography>
      </div>
    </div>
  );
};

export default MainCard;
