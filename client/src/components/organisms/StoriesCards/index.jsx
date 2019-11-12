import React from "react";
import StoriesController from "../../molecules/StoriesController";
import StoriesSelfCard from "../../molecules/StoriesSelfCard";

const Stories = () => {
  return (
    <section className="stories">
      <StoriesController />
      <div className="stories__cards">
        <StoriesSelfCard />
      </div>
    </section>
  );
};

export default Stories;
