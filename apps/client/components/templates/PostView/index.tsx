import dynamic from "next/dynamic";
import clsx from "clsx";

import PostHeader from "./PostHeader";

import { PostViewProps } from "./interfaces";
import styles from "./styles.module.scss";

const PostBody = dynamic(() => import("./PostBody"));

const PostView = (props: PostViewProps) => {
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
    sections[0].content && sections[0].content.slice(0, 3) === "<p>"
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

export default PostView;
