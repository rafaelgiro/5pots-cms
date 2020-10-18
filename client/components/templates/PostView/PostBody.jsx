/* eslint-disable react/no-array-index-key */
import { Fragment } from "react";
import PropTypes, { string } from "prop-types";
// import parse from "html-react-parser";
import Section from "../../organisms/Section";
import ContentHeader from "../../organisms/ContentHeader";
import ChampionChange from "../../molecules/ChampionChange";

import styles from "./styles.module.scss";

const PostBody = (props) => {
  const { sections, titles, title, category } = props;

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
        <Section key={`${title}-section-${index}`}>
          <h2>Campeões</h2>
          {section.champions &&
            section.champions.map((champ) => <ChampionChange champ={champ} />)}
        </Section>
      );
    });

    return content;
  };

  return (
    <>
      {/* <ContentHeader category="riot" titles={titles} title={title} />
      {titles[0] === "Introdução" && <div id="introdução" />}
      <div className={styles["view-post__content"]}>{renderSections()}</div> */}
    </>
  );
};

PostBody.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sections: PropTypes.array,
  titles: PropTypes.arrayOf(string),
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

PostBody.defaultProps = {
  sections: [{}],
  titles: [],
};

export default PostBody;
