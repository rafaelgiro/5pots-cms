import React from "react";
import PropTypes from "prop-types";

import Typography from "../../atoms/Typography";
import Button from "../../atoms/Button";

const PostClassic = props => {
  const { post, className } = props;

  return (
    <div className={`post-classic ${className}`}>
      <div className={`post-classic__cover ${post.category}`}>
        <img src={post.image} alt={post.title} />

        <div className="post-classic__cover__title">
          <Typography
            component="h2"
            variant="h4"
            className="post-classic__title"
          >
            {post.title}
          </Typography>
        </div>
      </div>

      <div className="post-classic__text">
        <Typography
          component="p"
          variant="p"
          className="post-classic__description"
        >
          {post.description}
        </Typography>
      </div>

      <div className={`post-classic__actions ${post.category}`}>
        <Button
          color={post.category}
          variant="outline"
          className="post-classic__actions__comments"
        >
          {post.commentsCount}
          COMENTÁRIOS
        </Button>
        <Button color={post.category} className="post-classic__actions__more">
          LEIA MAIS
        </Button>
      </div>
    </div>
  );
};

PostClassic.propTypes = {
  // Post a ser renderizado
  post: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    commentsCount: PropTypes.number.isRequired
  }).isRequired,
  // Classes extras para o component
  className: PropTypes.string
};

PostClassic.defaultProps = {
  className: ""
};

export default PostClassic;
