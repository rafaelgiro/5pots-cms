/* eslint-disable react/jsx-one-expression-per-line */

import PropTypes from "prop-types";

import FaWhatsapp from "@meronex/icons/fa/FaWhatsapp";
import FaTwitter from "@meronex/icons/fa/FaTwitter";
import FaFacebook from "@meronex/icons/fa/FaFacebook";

import Typography from "../../atoms/Typography";
import CatIcon from "../../atoms/Icons/CatIcon";

import TimeAgo from "../../../core/helpers/timeago";
import colors from "../../../core/constants/colors";

import styles from "./styles.module.scss";

const PostHeader = (props) => {
  const { category, title, blurb, img, author, url, postedAt } = props;

  return (
    <div className={styles["post-header"]}>
      <div className={styles["post-header__content"]}>
        <div className={styles["post-header__content__cat"]}>
          <div>
            <Typography component="p" variant="p">
              {category}
            </Typography>
            <Typography component="p" variant="p">
              Notícia Oficial
            </Typography>
          </div>
          <CatIcon stroke={colors[category]} />
        </div>
        <Typography
          component="h1"
          variant="h2"
          className={styles["post-header__content__title"]}
        >
          {title}
        </Typography>
        <Typography
          component="p"
          variant="h4"
          className={styles["post-header__content__blurb"]}
        >
          {blurb}
        </Typography>
        <div className={styles["post-header__content__details"]}>
          <Typography component="p" variant="p">
            Por: <strong style={{ color: colors[category] }}>{author}</strong>
          </Typography>
          <Typography component="p" variant="p">
            <em>
              Postado há {TimeAgo.inWords(Date.parse(postedAt))}{" "}
              {url && (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  no site oficial
                </a>
              )}
            </em>
          </Typography>
        </div>
        <div className={styles["post-header__content__social"]}>
          <FaWhatsapp /> <FaTwitter /> <FaFacebook />
        </div>
      </div>
      <div
        className={styles["post-header__img"]}
        style={{ backgroundImage: `url("${img}")` }}
      />
    </div>
  );
};

PostHeader.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string,
  postedAt: PropTypes.string.isRequired,
};

PostHeader.defaultProps = {
  url: "",
};

export default PostHeader;
