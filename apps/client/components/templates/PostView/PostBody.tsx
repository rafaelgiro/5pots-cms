import { Fragment } from "react";

import SectionTitle from "../../atoms/SectionTitle";
import SectionIcon from "../../atoms/Icons/SectionIcon";
import PostSummary from "../../molecules/PostSummary";
import ChampionChange from "../../molecules/ChampionChange";
import Section from "../../organisms/Section";
import ContentHeader from "../../organisms/ContentHeader";

import styles from "./styles.module.scss";

import { PostBodyProps } from "./interfaces";

const PostBody = (props: PostBodyProps) => {
  const { sections, titles, title, category, champions } = props;

  const renderSections = () => {
    const content = sections.map((section, index) => {
      if (category === "dev")
        if (index === 0)
          return (
            <div key={`${title}-section-${index}`}>
              Não gostei de como os posts dev ficaram, depois volto aqui &gt;:(
            </div>
            // <Fragment key={`${section.content[20]}-${index}`}>
            //   <Section>
            //     {parse(section.content)}
            //     <hr />
            //   </Section>
            // </Fragment>
          );
        else return <Fragment key={`${title}-section-${index}`} />;

      return (
        <Section
          className={styles["post-section"]}
          key={`${title}-section-${index}`}
        >
          <SectionTitle title="Campeões">
            <SectionIcon section="champions" />
          </SectionTitle>
          {section.champions &&
            section.champions.map((change, i) => {
              return (
                <ChampionChange
                  key={`champion-${change.name}-change-${i}`}
                  change={change}
                  champion={
                    champions.filter(
                      (champ) => champ.championName === change.name
                    )[0]
                  }
                />
              );
            })}
        </Section>
      );
    });

    return content;
  };

  return (
    <>
      <ContentHeader category={category} titles={titles} title={title} />
      {titles && titles[0] === "Introdução" && <div id="introdução" />}
      {category === "pbe" && <PostSummary />}
      <div className={styles["view-post__content"]}>{renderSections()}</div>
    </>
  );
};

export default PostBody;
