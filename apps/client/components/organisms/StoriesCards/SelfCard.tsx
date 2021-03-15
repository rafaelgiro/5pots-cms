import Typography from "../../atoms/Typography";

import { StorieCardProps } from "./interfaces";
import styles from "./styles.module.scss";

const SelfCard = (props: StorieCardProps) => {
  const { post } = props;

  const desc =
    post.description.length > 60
      ? `"${post.description.substring(0, 60)}..."`
      : `"${post.description}"`;

  return (
    <div className={styles["stories__self-card"]}>
      <div
        style={{ backgroundImage: `url(${post.image})` }}
        className={styles["stories__self-card__image"]}
      />
      <div className={styles["stories__self-card__info"]}>
        <div className={styles["stories__self-card__info__tags"]}>
          <img
            src="https://assets.5pots.com/file/cincopots/profile/535.jpg"
            alt="user avatar"
          />
          <div>
            <Typography component="p" variant="p">
              Postado por: <strong>datFranky</strong>
            </Typography>
            <Typography component="p" variant="sub">
              {post.category}
            </Typography>
          </div>
        </div>
        <Typography component="h3" variant="h4">
          {post.title}
        </Typography>
        <Typography
          component="p"
          variant="p"
          className={styles["stories__self-card__info__desc"]}
        >
          {desc}
        </Typography>
      </div>
    </div>
  );
};

export default SelfCard;
