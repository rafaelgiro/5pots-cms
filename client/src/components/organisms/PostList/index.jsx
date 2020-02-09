import React, { useState, useEffect } from "react";

import api from "../../../services/api";
import PostClassic from "../../molecules/PostClassic";

const PostList = () => {
  const [posts, setPosts] = useState();

  // Carrega os posts
  useEffect(() => {
    async function loadPosts() {
      const response = await api.get("/posts");

      setPosts(response.data);
    }

    loadPosts();
  }, []);

  // Renderiza os posts
  const renderPosts = () => {
    // Verifica se os posts foram carregados
    if (posts) {
      const postsList = posts.map(post => {
        return <PostClassic key={post.title} post={post} />;
      });
      return postsList;
    }
    // TODO: componente esqueleto
    return "loading...";
  };

  return (
    <section className="post-list">
      <div className="post-list__cards-container">{renderPosts()}</div>
    </section>
  );
};

export default PostList;
