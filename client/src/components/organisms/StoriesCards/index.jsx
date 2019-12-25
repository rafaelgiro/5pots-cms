import React from "react";
import StoriesController from "../../molecules/StoriesController";
import StoriesSelfCard from "../../molecules/StoriesSelfCard";
import StoriesLinkCard from "../../molecules/StoriesLinkCard";

const Stories = () => {
  return (
    <section className="stories">
      <StoriesController />
      <div className="stories__cards">
        <StoriesSelfCard />
        <StoriesLinkCard />
        <StoriesLinkCard />
      </div>
    </section>
  );
};

export default Stories;
