import React, { Fragment } from "react";
import PropTypes, { string, object } from "prop-types";
import parse from "html-react-parser";
import Section from "../Section";
import ContentHeader from "../ContentHeader";

const Dev = React.memo((props) => {
  const { sections, titles, title } = props;

  const renderSections = () => {
    const content = sections.map((section, index) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={`${section.content[20]}-${index}`}>
          <Section>
            {parse(section.content)}
            <hr />
          </Section>
        </Fragment>
      );
    });

    return content;
  };

  return (
    <>
      <ContentHeader category="riot" titles={titles} title={title} />
      <div className="view-post__content">{renderSections()}</div>
    </>
  );
});

Dev.propTypes = {
  sections: PropTypes.arrayOf(object).isRequired,
  titles: PropTypes.arrayOf(string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Dev;
