import { Fragment } from "react";

import PostSummary from "../../molecules/PostSummary";
import ContentHeader from "../../organisms/ContentHeader";
import SkinsSectionDev from "../../organisms/PatchNotesSections/SkinsDev";
import ChampionsSectionDev from "../../organisms/PatchNotesSections/ChampionsDev";

import { PostBodyDevProps } from "./interfaces";
import postViewstyles from "../PostView/styles.module.scss";
import NewChampion from "../../molecules/NewChampion/NewChampion";

const PostBodyDev = (props: PostBodyDevProps) => {
  const { sections, titles, title, type, allChampions } = props;

  const renderSections = () => {
    const content = sections.map((section, i) => {
      if (type !== "patch-notes") return null;

      if (section.skins)
        return (
          <SkinsSectionDev skinsSection={section.skins} key={`section-skins`} />
        );

      if (section.champions)
        return (
          <ChampionsSectionDev
            championSection={section.champions}
            key="champions-section"
            allChampions={allChampions}
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
      <div className={postViewstyles["view-post__content"]}>
        {renderSections()}
      </div>
    </>
  );
};

export default PostBodyDev;