/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-one-expression-per-line */

import Link from "next/link";
import PropTypes from "prop-types";
import clsx from "clsx";

import Typography from "../../atoms/Typography";

import colors from "../../../core/constants/colors";
import TimeAgo from "../../../core/helpers/timeago";

import styles from "./styles.module.scss";

const Post = (props) => {
  const { post, className } = props;
  const postClassName = clsx(styles.post, className);
  const cat =
    (post.category === "riot" && "Notícia Oficial") ||
    (post.category === "dev" && "Notícia Oficial") ||
    (post.category === "pbe" && "Atualização do PBE") ||
    (post.category === "artigo" && "Artigo") ||
    (post.category === "default" && "Sem categoria");

  return (
    <div className={postClassName}>
      <div className={styles.post__content}>
        <Typography
          className={styles.post__content__label}
          component="p"
          variant="p"
        >
          <span style={{ color: colors[post.category] }}>{cat}</span>
        </Typography>

        <Typography
          className={styles.post__content__title}
          component="h3"
          variant="h3"
        >
          <Link href={`/posts/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </Typography>
        <Typography
          className={styles.post__content__desc}
          variant="p"
          component="p"
        >
          {post.blurb}
        </Typography>
        <Typography
          className={styles["post__content__read-more"]}
          variant="p"
          component="p"
        >
          <Link href={`/posts/${post.slug}`}>
            <a>Leia mais &gt;</a>
          </Link>
        </Typography>
      </div>
      <Link href={`/posts/${post.slug}`}>
        <a>
          <div
            style={{
              backgroundImage: `url(${post.img})`,
              borderColor: colors[post.category],
            }}
            className={styles.post__image}
          />
        </a>
      </Link>
      <div className={styles.post__details}>
        <div>
          <Typography variant="p" component="p">
            <strong>Postado por:</strong>
            <br /> {post.author}
          </Typography>
        </div>
        <div>
          <Typography variant="p" component="p">
            <strong>Quando:</strong>
            <br /> {TimeAgo.inWords(Date.parse(post.postedAt))}
          </Typography>
        </div>
        <div>
          <Typography variant="p" component="p">
            <strong>Tags:</strong>
            <br /> {post.category}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export const PostSkeleton = () => {
  return (
    <div className={styles.post__skeleton}>
      <div className={styles.post__skeleton__content}>
        <div className={styles["post__skeleton__content-1"]} />
        <div className={styles["post__skeleton__content-2"]} />
        <div className={styles["post__skeleton__content-3"]} />
        <div className={styles["post__skeleton__content-4"]} />
        <div className={styles["post__skeleton__content-5"]} />
        <div className={styles["post__skeleton__content-6"]} />
        <div className={styles["post__skeleton__content-7"]} />
      </div>
      <div className={styles.post__skeleton__image} />
      <div className={styles.post__skeleton__details} />
    </div>
  );
};

Post.propTypes = {
  // Post a ser renderizado
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    blurb: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string,
    postedAt: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
  // Classes extras para o component
  className: PropTypes.string,
};

Post.defaultProps = {
  className: "",
};

export default Post;
