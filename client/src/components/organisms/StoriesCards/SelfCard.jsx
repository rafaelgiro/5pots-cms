/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";
import Typography from "../../atoms/Typography";

const SelfCard = (props) => {
  const { post } = props;

  const desc =
    post.description.length > 60
      ? `"${post.description.substring(0, 60)}..."`
      : `"${post.description}"`;

  return (
    <div className="stories__self-card">
      <div
        style={{ backgroundImage: `url(${post.image})` }}
        className="stories__self-card__image"
      />
      <div className="stories__self-card__info">
        <div className="stories__self-card__info__tags">
          <img
            src="https://ddragon.leagueoflegends.com/cdn/10.5.1/img/profileicon/535.png"
            alt="user avatar"
          />
          <div>
            <Typography component="p" variant="p">
              Postado por: <strong>datFranky</strong>
            </Typography>
            <Typography component="p" variant="sub">
              {post.category}
            </Typography>
          </div>
        </div>
        <Typography component="h3" variant="h4">
          {post.title}
        </Typography>
        <Typography
          component="p"
          variant="p"
          className="stories__self-card__info__desc"
        >
          {desc}
        </Typography>
      </div>
    </div>
  );
};

SelfCard.propTypes = {
  // Post a ser renderizado
  post: PropTypes.shape({
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default SelfCard;
