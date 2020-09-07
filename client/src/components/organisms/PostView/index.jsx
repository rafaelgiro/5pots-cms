import React from "react";
import PropTypes from "prop-types";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";

const PostView = (props) => {
  const { post } = props;
  const {
    category,
    title,
    blurb,
    img,
    author,
    url,
    sections,
    subTitles,
    postedAt,
  } = post;

  // Checa se tem um parágrafo de introdução sem título
  const hasIntro =
    sections[0].content.slice(0, 3) === "<p>"
      ? ["Introdução", ...subTitles]
      : subTitles;

  return (
    <article className={`post-view ${post.category}`}>
      <PostHeader
        category={category}
        title={title}
        blurb={blurb}
        img={img}
        author={author}
        url={url}
        postedAt={postedAt}
      />
      <PostBody sections={sections} titles={hasIntro} title={title} />
    </article>
  );
};

PostView.propTypes = {
  // Post a ser renderizado
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    blurb: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string,
    sections: PropTypes.array,
    subTitles: PropTypes.array,
    postedAt: PropTypes.string,
  }).isRequired,
};

export default PostView;
