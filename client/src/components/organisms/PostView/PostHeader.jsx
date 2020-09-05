/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";
import { FaWhatsapp, FaTwitter, FaFacebook } from "react-icons/fa";

import Typography from "../../atoms/Typography";
import CatIcon from "../../atoms/Icons/CatIcon";

import TimeAgo from "../../../helpers/timeago";
import colors from "../../../constants/colors";

const PostHeader = (props) => {
  const { category, title, blurb, img, author, url, postedAt } = props;

  return (
    <div className="post-header">
      <div className="post-header__content">
        <div className="post-header__content__cat">
          <div>
            <Typography component="p" variant="p">
              {category}
            </Typography>
            <Typography component="p" variant="p">
              Notícia Oficial
            </Typography>
          </div>
          <CatIcon stroke={colors[category]} />
        </div>
        <Typography
          component="h1"
          variant="h2"
          className="post-header__content__title"
        >
          {title}
        </Typography>
        <Typography
          component="p"
          variant="h4"
          className="post-header__content__blurb"
        >
          {blurb}
        </Typography>
        <div className="post-header__content__details">
          <Typography component="p" variant="p">
            Por: <strong style={{ color: colors[category] }}>{author}</strong>
          </Typography>
          <Typography component="p" variant="p">
            <em>Postado há {TimeAgo.inWords(Date.parse(postedAt))}</em>
          </Typography>
        </div>
        <div className="post-header__content__social">
          <FaWhatsapp /> <FaTwitter /> <FaFacebook />
        </div>
      </div>
      <div
        className="post-header__img"
        style={{ backgroundImage: `url("${img}")` }}
      />
    </div>
  );
};

PostHeader.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string,
  postedAt: PropTypes.string.isRequired,
};

PostHeader.defaultProps = {
  url: "",
};

export default PostHeader;
