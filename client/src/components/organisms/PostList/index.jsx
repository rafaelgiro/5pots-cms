import React, { useState, useEffect } from "react";

import api from "../../../services/api";
import Post, { PostSkeleton } from "../../molecules/Post";
import Typography from "../../atoms/Typography";

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
      const postsList = posts.map((post) => {
        return <Post key={post.title} post={post} />;
      });
      return postsList;
    }

    return (
      <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </>
    );
  };

  return (
    <section className="post-list">
      <div className="post-list__controller">
        <div>
          <Typography
            className="stories__controller__sub-title"
            component="p"
            variant="p"
          >
            Todas as
          </Typography>
          <Typography
            className="stories__controller__title"
            component="p"
            variant="p"
          >
            Postagens
          </Typography>
        </div>
        <Typography
          className="stories__controller__desc"
          component="p"
          variant="p"
        >
          Confira o restante das postagens da 5pots em ordem cronológica.
        </Typography>
      </div>
      <div className="post-list__cards-container">{renderPosts()}</div>
    </section>
  );
};

export default PostList;
