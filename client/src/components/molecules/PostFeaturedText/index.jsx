import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

import Typography from "../../atoms/Typography";

const PostFeaturedText = () => {
  // Objeto de post para fins de desenvolvimento
  const post = {
    title: "MAPA DOS CAMPEÕES: JUNHO DE 2020",
    desc:
      "Uma caçadora onírica, um assassino mascarado e um atirador aventureiro. E de quem será a próxima AVM?",
  };

  return (
    <div className="post-featured-text">
      <Typography
        component="h2"
        variant="h1"
        className="post-featured-text__title"
      >
        {post.title}
      </Typography>
      <Typography
        component="p"
        variant="p"
        className="post-featured-text__desc"
      >
        {post.desc}
      </Typography>
      <div className="post-featured-text__link-container">
        <Typography
          component="p"
          variant="p"
          className="post-featured-text__link"
        >
          Leia mais
        </Typography>
        <MdKeyboardArrowRight className="post-featured-text__link--arrow" />
      </div>
    </div>
  );
};

export default PostFeaturedText;
