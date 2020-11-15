import PropTypes, { arrayOf, shape, string } from "prop-types";
import dynamic from "next/dynamic";
import clsx from "clsx";

import PostHeader from "./PostHeader";

import styles from "./styles.module.scss";

const PostBody = dynamic(() => import("./PostBody"));

const PostView = (props) => {
  const { post, champions } = props;
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
    sections.content && sections[0].content.slice(0, 3) === "<p>"
      ? ["Introdução", ...subTitles]
      : subTitles;

  return (
    <article className={clsx(styles["post-view"], styles[post.category])}>
      <PostHeader
        category={category}
        title={title}
        blurb={blurb}
        img={img}
        author={author}
        url={url}
        postedAt={postedAt}
      />
      <PostBody
        sections={sections}
        titles={hasIntro}
        title={title}
        category={category}
        champions={champions}
      />
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
    champions: PropTypes.arrayOf(PropTypes.string),
    img: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    sections: PropTypes.array,
    subTitles: PropTypes.arrayOf(PropTypes.string),
    postedAt: PropTypes.string,
  }).isRequired,
  champions: PropTypes.arrayOf(
    shape({
      abilities: shape({
        p: string.isRequired,
        q: string.isRequired,
        w: string.isRequired,
        e: string.isRequired,
        r: string.isRequired,
      }).isRequired,
      championName: string.isRequired,
      tags: arrayOf(string).isRequired,
      title: string.isRequired,
    })
  ).isRequired,
};

export default PostView;
