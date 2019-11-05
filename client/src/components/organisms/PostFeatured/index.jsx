import React from "react";

const PostFeatured = () => {
  return (
    <div className="post-featured">
      <div>Texto</div>
      <div className="post-featured__image-container">
        <div className="post-featured__image post-featured__image-1" />
        <div className="post-featured__image post-featured__image-2" />
        <div className="post-featured__image post-featured__image-3" />
      </div>
    </div>
  );
};

export default PostFeatured;
