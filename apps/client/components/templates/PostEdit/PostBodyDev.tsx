import PostSummary from "../../molecules/PostSummary";
import ContentHeader from "../../organisms/ContentHeader";
import ChampionsSectionDev from "../../organisms/PatchNotesSections/ChampionsDev";

import { PostBodyDevProps } from "./interfaces";
import postViewstyles from "../PostView/styles.module.scss";
import SkinsSectionDev from "../../organisms/PatchNotesSections/SkinsDev";

const PostBodyDev = (props: PostBodyDevProps) => {
  const { sections, titles, title, type, allChampions } = props;

  const renderSections = () => {
    const content = sections.map((section) => {
      if (type !== "patch-notes") return null;

      if (section.champions)
        return (
          <>
            <SkinsSectionDev />
            <ChampionsSectionDev
              championSection={section.champions}
              key="champions-section"
              allChampions={allChampions}
            />
          </>
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
