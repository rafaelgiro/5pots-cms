import PostSummary from "../../molecules/PostSummary";

import ContentHeader from "../../organisms/ContentHeader";
import ChampionsSection from "../../organisms/PatchNotesSections/Champions";
import SkinsSection from "../../organisms/PatchNotesSections/Skins";

import styles from "./styles.module.scss";

import { PostBodyProps } from "./interfaces";

const PostBody = (props: PostBodyProps) => {
  const { sections, titles, title, champions, type } = props;

  const renderSections = () => {
    const content = sections.map((section) => {
      if (type !== "patch-notes") return null;

      if (section.skins)
        return (
          <SkinsSection skinsSection={section.skins} key={`section-skins`} />
        );

      if (section.champions)
        return (
          <ChampionsSection
            championSection={section.champions}
            champions={champions}
            key="champions-section"
          />
        );
    });

    return content;
  };

  return (
    <>
      <ContentHeader type={type} titles={titles} title={title} />
      {titles && titles[0] === "Introdução" && <div id="introdução" />}
      {type === "patch-notes" && <PostSummary />}
      <div className={styles["view-post__content"]}>{renderSections()}</div>
    </>
  );
};

export default PostBody;
