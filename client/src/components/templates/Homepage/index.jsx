import React from "react";

import PostFeatured from "../../organisms/PostFeatured";
import StoriesCards from "../../organisms/StoriesCards";
//import PostList from "../../organisms/PostList";

const Homepage = () => {
  return (
    <div className="homepage">
      <PostFeatured />
      <StoriesCards />
      {/* <PostList /> */}
    </div>
  );
};

export default Homepage;
