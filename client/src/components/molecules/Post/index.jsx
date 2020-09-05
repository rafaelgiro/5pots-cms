/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import Typography from "../../atoms/Typography";

import colors from "../../../constants/colors";
import TimeAgo from "../../../helpers/timeago";
import { Link } from "react-router-dom";

const Post = (props) => {
  const { post, className } = props;
  const postClassName = clsx("post", className);
  const cat =
    (post.category === "riot" && "Notícia Oficial") ||
    (post.category === "dev" && "Notícia Oficial") ||
    (post.category === "pbe" && "Atualização do PBE") ||
    (post.category === "artigo" && "Artigo") ||
    (post.category === "default" && "Sem categoria");

  return (
    <div className={postClassName}>
      <div className="post__content">
        <Typography className="post__content__label" component="p" variant="p">
          <span style={{ color: colors[post.category] }}>{cat}</span>
        </Typography>

        <Typography
          className="post__content__title"
          component="h3"
          variant="h3"
        >
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </Typography>
        <Typography className="post__content__desc" variant="p" component="p">
          {post.blurb}
        </Typography>
        <Typography
          className="post__content__read-more"
          variant="p"
          component="p"
        >
          <Link to={`/posts/${post._id}`}>Leia mais &gt;</Link>
        </Typography>
      </div>
      <Link to={`/posts/${post._id}`}>
        <div
          style={{
            backgroundImage: `url(${post.img})`,
            borderColor: colors[post.category],
          }}
          className="post__image"
        />
      </Link>
      <div className="post__details">
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
    <div className="post__skeleton">
      <div className="post__skeleton__content">
        <div className="post__skeleton__content-1" />
        <div className="post__skeleton__content-2" />
        <div className="post__skeleton__content-3" />
        <div className="post__skeleton__content-4" />
        <div className="post__skeleton__content-5" />
        <div className="post__skeleton__content-6" />
        <div className="post__skeleton__content-7" />
      </div>
      <div className="post__skeleton__image" />
      <div className="post__skeleton__details" />
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
  }).isRequired,
  // Classes extras para o component
  className: PropTypes.string,
};

Post.defaultProps = {
  className: "",
};

export default Post;
