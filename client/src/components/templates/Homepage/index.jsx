import React from "react";
import PostFeatured from "../../organisms/PostFeatured";
import StoriesCards from "../../organisms/StoriesCards";

const Homepage = () => {
  return (
    <div className="homepage">
      <PostFeatured />
      <StoriesCards />
    </div>
  );
};

export default Homepage;
