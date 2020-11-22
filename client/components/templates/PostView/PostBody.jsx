/* eslint-disable react/no-array-index-key */
import { Fragment } from "react";
import PropTypes, { arrayOf, shape, string } from "prop-types";

import Section from "../../organisms/Section";
import ContentHeader from "../../organisms/ContentHeader";
import PostSummary from "../../molecules/PostSummary";
import ChampionChange from "../../molecules/ChampionChange";
import SectionIcon from "../../atoms/Icons/SectionIcon";

import styles from "./styles.module.scss";
import SectionTitle from "../../atoms/SectionTitle";

const PostBody = (props) => {
  const { sections, titles, title, category, champions } = props;

  const renderSections = () => {
    const content = sections.map((section, index) => {
      if (category === "dev")
        if (index === 0)
          return (
            <div key={`${title}-section-${index}`}>
              Não gostei de como os posts dev ficaram, depois volto aqui &gt;:(
            </div>
            // eslint-disable-next-line react/no-array-index-key
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

      {titles[0] === "Introdução" && <div id="introdução" />}
      {category === "pbe" && (
        <PostSummary champions={champions} sections={sections} />
      )}
      <div className={styles["view-post__content"]}>{renderSections()}</div>
    </>
  );
};

PostBody.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sections: PropTypes.array,
  titles: PropTypes.arrayOf(string),
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
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

PostBody.defaultProps = {
  sections: [{}],
  titles: [],
};

export default PostBody;
