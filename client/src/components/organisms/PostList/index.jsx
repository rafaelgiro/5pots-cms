import React, { useState, useEffect } from "react";

import Typography from "../../atoms/Typography";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  // React Hook que fará a chamada na api para buscar os posts
  useEffect(() => {
    const response = [
      {
        title: "TEAMFIGHT TACTICS: A ASCENSÃO DOS ELEMENTOS",
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image: "https://i.imgur.com/YLdeUgB.png",
        commentsCount: 24,
        color: "default"
      },
      {
        title: "ATUALIZAÇÃO DO PBE 25/10 NOVAS ARENAS DO TFT",
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image: "https://i.imgur.com/7AxcReo.png",
        commentsCount: 12,
        color: "pbe"
      },
      {
        title: "TEMA DA CAMPEÃ SENNA",
        description: `A fase beta de Teamfight Tactics chegou ao fim, e os 
      elementos ascenderão na segunda temporada! Sendo nosso primeiro novo 
      conjunto, A Ascensão dos Elementos muda completamente os Campeões, as 
      Origens e as Classes que você conheceu durante o beta.`,
        image: "https://i.imgur.com/q2dnH94.png",
        commentsCount: 345,
        color: "riot"
      }
    ];

    setPosts(response);
  }, []);

  return (
    <>
      {posts.map(post => (
        <section className="post-list">
          <div className={`post-list__cover ${post.color}`}>
            <img src={post.image} alt={post.title} />
          </div>

          <div className="post-list__text">
            <div className="post-list__text__wrap">
              <Typography
                component="h2"
                variant="h4"
                className="post-list__title"
              >
                {post.title}
              </Typography>
            </div>

            <Typography
              component="p"
              variant="p"
              className="post-list__description"
            >
              {post.description}
            </Typography>
          </div>

          <div className={`post-list__actions ${post.color}`}>
            <button class="post-list__actions__comments">
              {post.commentsCount} COMENTÁRIOS
            </button>
            <button class="post-list__actions__more">LEIA MAIS</button>
          </div>
        </section>
      ))}
    </>
  );
}
