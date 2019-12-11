import React, { useState, useEffect } from "react";

import Typography from "../../atoms/Typography";

import api from "../../../services/api";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const response = await api.get("/posts");

      setPosts(response.data);
    }

    loadPosts();
  }, []);

  return (
    <>
      {posts.map((post, index) => (
        <section key={index} className="post-list">
          <div className={`post-list__cover ${post.color}`}>
            <img src={post.image} alt={post.title} />

            <div className="post-list__cover__title">
              <Typography
                component="h2"
                variant="h4"
                className="post-list__title"
              >
                {post.title}
              </Typography>
            </div>
          </div>

          <div className="post-list__text">
            <Typography
              component="p"
              variant="p"
              className="post-list__description"
            >
              {post.description}
            </Typography>
          </div>

          <div className={`post-list__actions ${post.color}`}>
            <button className="post-list__actions__comments">
              {post.commentsCount} COMENTÁRIOS
            </button>
            <button className="post-list__actions__more">LEIA MAIS</button>
          </div>
        </section>
      ))}
    </>
  );
}
