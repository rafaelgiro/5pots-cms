import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Typography from "../../atoms/Typography";

const PostCard = props => {
  const { post, className, number, heightSize, setHeightSize } = props;

  const getRandomHeight = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const left = ((number + 1) % 3) * 33.3333;
  const height = getRandomHeight(600, 700);
  const top = heightSize[Math.floor(number / 3)];

  console.log(Math.floor(number / 3));

  useEffect(() => {
    if (number % 3 === 0) {
      setHeightSize([heightSize[0] + height, heightSize[1], heightSize[2]]);
    } else if (number % 3 === 1) {
      setHeightSize([heightSize[0], heightSize[1] + height, heightSize[2]]);
    } else {
      setHeightSize([heightSize[0], heightSize[1], heightSize[2] + height]);
    }
  }, []);

  return (
    <div
      className={`post-card ${className}`}
      style={{
        backgroundImage: `url(${post.image})`,
        height: `${height}px`,
        left: `${left}%`,
        top: `${top}px`
      }}
    >
      <div className="post-card__bg" />
      <Typography component="h2" variant="h4" className="post-card__title">
        {post.title}
        {top}
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
  className: ""
};

export default PostCard;
