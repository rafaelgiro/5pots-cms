import React from "react";
import Typography from "../../atoms/Typography";

const StoriesLinkCard = () => {
  return (
    <div className="stories__link-card">
      <Typography className="stories__link-card__tag" component="p" variant="p">
        Notícia Oficial
      </Typography>
      <Typography component="h3" variant="h4">
        <span className="stories__link-card__title-champion-main">Senna</span>
        <span className="stories__link-card__title-champion-sub">
          - A Redentora
        </span>
      </Typography>
      <Typography
        className="stories__link-card__desc--quote"
        component="p"
        variant="p"
      >
        &ldquo;Enquanto as sombras abraçam a luz, eu as abraço...&rdquo;
      </Typography>
      <div className="stories__link-card__img" />
    </div>
  );
};

export default StoriesLinkCard;
