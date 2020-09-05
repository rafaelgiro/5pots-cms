import React from "react";
import PropTypes from "prop-types";

const Section = (props) => {
  const { children, name } = props;
  return (
    <section>
      <span className="section-id">{name}</span>
      {children}
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
};

Section.defaultProps = {
  name: "",
};

export default Section;
