import React from "react";
import Typography from "../../atoms/Typography";

const StoriesSelfCard = () => {
  return (
    <div className="stories__self-card">
      <div className="stories__self-card__img" />
      <div className="stories__self-card__author">
        <img
          src="https://opgg-static.akamaized.net/images/profile_icons/profileIcon535.jpg"
          className="stories__self-card__author__img"
          alt="avatar do criador do post"
        />
        <div>
          <Typography component="p" variant="p">
            Postado por:
            <strong>datFranky</strong>
          </Typography>
          <Typography
            className="stories__self-card__author__tag"
            component="p"
            variant="p"
          >
            Atualização do PBE
          </Typography>
        </div>
      </div>
      <Typography component="h3" variant="h4">
        Atualização do PBE 11/11: Sion eu te amo
      </Typography>
    </div>
  );
};

export default StoriesSelfCard;
