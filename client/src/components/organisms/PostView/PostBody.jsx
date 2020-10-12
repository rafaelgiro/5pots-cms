import React, { Fragment } from "react";
import PropTypes, { string, object } from "prop-types";
import parse from "html-react-parser";
import Section from "../Section";
import ContentHeader from "../ContentHeader";
import ChampionChange from "../../molecules/ChampionChange";

const PostBody = React.memo((props) => {
  const { sections, titles, title, category } = props;

  const renderSections = () => {
    const content = sections.map((section, index) => {
      if (category === "dev")
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={`${section.content[20]}-${index}`}>
            <Section>
              {parse(section.content)}
              <hr />
            </Section>
          </Fragment>
        );

      return (
        <Section>
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
      <ContentHeader category="riot" titles={titles} title={title} />
      {titles[0] === "Introdução" && <div id="introdução" />}
      <div className="view-post__content">{renderSections()}</div>
    </>
  );
});

PostBody.propTypes = {
  sections: PropTypes.arrayOf(object).isRequired,
  titles: PropTypes.arrayOf(string).isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default PostBody;
