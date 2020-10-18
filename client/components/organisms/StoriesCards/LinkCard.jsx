import PropTypes from "prop-types";
import Typography from "../../atoms/Typography";

import styles from "./styles.module.scss";

const LinkCard = (props) => {
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

LinkCard.propTypes = {
  // Post a ser renderizado
  post: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default LinkCard;
