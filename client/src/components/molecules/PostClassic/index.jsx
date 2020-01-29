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
        <Typography
          component="p"
          variant="p"
          className="post-classic__category"
        >
          Patch: 10.2 PBE - Postado por Dantenor Francisco
        </Typography>
        <Typography component="p" variant="p" className="post-classic__desc">
          {post.description}
        </Typography>
        <div className="post-classic__link-container">
          <Typography component="p" variant="p" className="post-classic__link">
            Leia mais
          </Typography>
          <MdKeyboardArrowRight className="post-classic__link--arrow" />
        </div>
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
