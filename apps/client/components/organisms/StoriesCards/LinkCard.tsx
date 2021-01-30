import Typography from "../../atoms/Typography";

import { StorieCardProps } from "./interfaces";
import styles from "./styles.module.scss";

const LinkCard = (props: StorieCardProps) => {
  const { post } = props;

  const desc =
    post.description.length > 60
      ? `"${post.description.substring(0, 60)}..."`
      : `"${post.description}"`;

  return (
    <div className={styles["stories__link-card"]}>
      <div className={styles["stories__link-card__info"]}>
        <Typography component="p" variant="sub">
          {post.category}
        </Typography>
        <Typography component="h3" variant="h4">
          {post.title}
        </Typography>
      </div>
      <Typography
        component="p"
        variant="p"
        className={styles["stories__link-card__info__desc"]}
      >
        {desc}
      </Typography>
      <div
        style={{ backgroundImage: `url(${post.image})` }}
        className={styles["stories__link-card__image"]}
      />
    </div>
  );
};

export default LinkCard;
