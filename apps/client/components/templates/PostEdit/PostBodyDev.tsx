import AddSection from "./AddSection";
import PostSummary from "../../molecules/PostSummary";
import ContentHeader from "../../organisms/ContentHeader";
import SkinsSectionDev from "../../organisms/PatchNotesSections/SkinsDev";
import ChampionsSectionDev from "../../organisms/PatchNotesSections/ChampionsDev";

import GeneralSectionDev from "../../organisms/GeneralSection/dev";

import { PostBodyDevProps } from "./interfaces";
import postViewstyles from "../PostView/styles.module.scss";

const PostBodyDev = (props: PostBodyDevProps) => {
  const { sections, titles, title, type, allChampions } = props;

  const renderSections = () => {
    const content = sections.map((section, i) => {
      if (type !== "patch-notes") return null;

      if (section.content)
        return (
          <GeneralSectionDev
            sectionIndex={i}
            key={`${i}-section-general`}
            content={section.content}
          />
        );

      if (section.skins)
        return (
          <SkinsSectionDev
            sectionIndex={i}
            skinsSection={section.skins}
            key={`section-skins`}
          />
        );

      if (section.champions)
        return (
          <ChampionsSectionDev
            championSection={section.champions}
            key="champions-section"
            allChampions={allChampions}
            sectionIndex={i}
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
        <AddSection />
      </div>
    </>
  );
};

export default PostBodyDev;
