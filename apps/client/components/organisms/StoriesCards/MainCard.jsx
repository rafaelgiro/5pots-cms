import PropTypes from "prop-types";
import Typography from "../../atoms/Typography";

import styles from "./styles.module.scss";

const MainCard = (props) => {
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

MainCard.propTypes = {
  // Post a ser renderizado
  post: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainCard;
