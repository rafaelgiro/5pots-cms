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
      <div
        style={{
          backgroundImage: `url(${post.image})`,
          borderColor: colors[post.category],
        }}
        className="post__image"
      />
      <div className="post__content">
        <Typography className="post__content__label" component="p" variant="p">
          Há 31 minutos em{" "}
          <span style={{ color: colors[post.category] }}>{cat}</span>
        </Typography>

        <Typography
          className="post__content__title"
          component="h3"
          variant="h4"
        >
          {post.title}
        </Typography>
        <Typography variant="p" component="p">
          {post.description}
        </Typography>
      </div>
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
