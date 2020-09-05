import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import PostView from "../../organisms/PostView";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function getPosts() {
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
    }
    getPosts();
  }, [id]);

  const renderPost = () => {
    switch (post) {
      case null:
        return <h2>Loading...</h2>;
      default:
        return <PostView post={post} />;
    }
  };

  return <div className="post-page">{renderPost()}</div>;
};

export default PostPage;
