import React from "react";
import PostFeaturedImage from "../../molecules/PostFeaturedImage";
import PostFeaturedText from "../../molecules/PostFeaturedText";

const PostFeatured = () => {
  return (
    <section className="post-featured">
      <PostFeaturedText />
      <PostFeaturedImage />
    </section>
  );
};

export default PostFeatured;
