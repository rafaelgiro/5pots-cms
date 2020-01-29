import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '../../atoms/Typography';

const PostCard = props => {
  const { post, className, number, heightSize, setHeightSize } = props;

  const getRandomHeight = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const height = getRandomHeight(375, 475);

  return (
    <div className={`post-card ${className}`}>
      <div
        className={`post-card__bg post-card__bg--${post.category}`}
        style={{
          backgroundImage: `url(${post.image})`,
          height: `${height}px`
        }}
      />
      <Typography component="h2" variant="h4" className="post-card__title">
        <span>{post.title}</span>
      </Typography>
    </div>
  );
};

PostCard.propTypes = {
  // Post a ser renderizado
  post: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    commentsCount: PropTypes.number.isRequired
  }).isRequired,
  number: PropTypes.number.isRequired,
  // Classes extras para o component
  className: PropTypes.string
};

PostCard.defaultProps = {
  className: ''
};

export default PostCard;
