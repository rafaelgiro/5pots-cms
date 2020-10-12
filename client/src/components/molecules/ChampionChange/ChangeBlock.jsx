/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes, { string } from "prop-types";
import Typography from "../../atoms/Typography";

const ChangeBlock = (props) => {
  const { block, champion } = props;

  const typeMap = {
    removed: "REMOVIDO",
    new: "NOVO",
    updated: "ATUALIZADO",
    reworked: "REFEITO",
  };

  return (
    <Typography component="p" variant="p">
      {block.type !== "change" && (
        <span
          className={`champion-change--type champion-change--type-${block.type}`}
        >
          {typeMap[block.type]}
        </span>
      )}
      <span className="champion-change--attribute">{block.attribute}</span>:{" "}
      {block.before && (
        <>
          <span className="champion-change--before">{block.before}</span> -&gt;{" "}
        </>
      )}
      <span className="champion-change--after">{block.after}</span>
    </Typography>
  );
};

ChangeBlock.propTypes = {
  block: PropTypes.shape({
    type: string,
    attribute: string,
    before: string,
    after: string,
  }).isRequired,
};

export default ChangeBlock;
