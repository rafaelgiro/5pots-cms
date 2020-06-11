/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import Typography from "../../atoms/Typography";

import colors from "../../../constants/colors";

const Post = (props) => {
  const { post, className } = props;

  const postClassName = clsx("post", className, post.small && "post__small");

  const cat =
    (post.category === "riot" && "Notícia Oficial") ||
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
          {post.title}
        </Typography>
        <Typography className="post__content__desc" variant="p" component="p">
          {post.description}
        </Typography>
        <Typography
          className="post__content__read-more"
          variant="p"
          component="p"
        >
          Leia mais &gt;
        </Typography>
      </div>
      <div
        style={{
          backgroundImage: `url(${post.image})`,
          borderColor: colors[post.category],
        }}
        className="post__image"
      />
      <div className="post__details">
        <div>
          <Typography variant="p" component="p">
            <strong>Postado por:</strong>
            <br /> datFranky
          </Typography>
        </div>
        <div>
          <Typography variant="p" component="p">
            <strong>Quando:</strong>
            <br /> Há 31 minutos
          </Typography>
        </div>
        <div>
          <Typography variant="p" component="p">
            <strong>Tags:</strong>
            <br /> Post oficial, riot
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
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    small: PropTypes.bool.isRequired,
  }).isRequired,
  // Classes extras para o component
  className: PropTypes.string,
};

Post.defaultProps = {
  className: "",
};

export default Post;
