import React from "react";
import PropTypes from "prop-types";
import { MdKeyboardArrowRight } from "react-icons/md";

import Typography from "../../atoms/Typography";

import colors from "../../../constants/colors";

const PostClassic = props => {
  const { post, className } = props;

  return (
    <div
      style={{
        backgroundImage: `url(${post.image})`,
        borderColor: colors[post.category]
      }}
      className={`post-classic ${className}`}
    >
      <div className="post-classic__container">
        <Typography component="h3" variant="h3" className="post-classic__title">
          {post.title}
        </Typography>
        <Typography component="p" variant="sub">
          {post.tag} - Postado por {post.author}
        </Typography>
        <Typography component="p" variant="p" className="post-classic__desc">
          {post.description}
        </Typography>
        <div className="post-classic__link-container">
          <Typography
            link={post.link}
            component="a"
            variant="a"
            className="post-classic__link"
          >
            Leia mais
          </Typography>
          <MdKeyboardArrowRight className="post-classic__link--arrow" />
        </div>
      </div>
    </div>
  );
};

export const PostClassicSkeleton = () => {
  return (
    <div className="post-classic__skeleton">
      <div className="post-classic__skeleton-1" />
      <div className="post-classic__skeleton-2" />
      <div className="post-classic__skeleton__container">
        <div className="post-classic__skeleton__title" />
        <div className="post-classic__skeleton__desc post-classic__skeleton__desc-1" />
        <div className="post-classic__skeleton__desc post-classic__skeleton__desc-2" />
        <div className="post-classic__skeleton__link" />
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
    image: PropTypes.string.isRequired
  }).isRequired,
  // Classes extras para o component
  className: PropTypes.string
};

PostClassic.defaultProps = {
  className: ""
};

export default PostClassic;
