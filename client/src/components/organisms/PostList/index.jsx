import React, { useState, useEffect } from 'react';

import api from '../../../services/api';
import PostCard from '../../molecules/PostCard';

export default function PostList() {
  const [posts, setPosts] = useState();
  // eslint-disable-next-line no-unused-vars
  const [postType, setPostType] = useState('card');
  const [heightSize, setHeightSize] = useState([0, 0, 0]);

  // Carrega os posts
  useEffect(() => {
    async function loadPosts() {
      const response = await api.get('/posts');

      setPosts(response.data);
    }

    loadPosts();
  }, []);

  // Renderiza os posts
  const renderPosts = () => {
    // Verifica se os posts foram carregados
    if (posts) {
      const postsC1 = posts.map((post, index) => {
        if (index % 3 === 0) {
          return (
            <PostCard
              key={index}
              post={post}
              number={index}
              heightSize={heightSize}
              setHeightSize={setHeightSize}
            />
          );
        }
      });

      const postsC2 = posts.map((post, index) => {
        if (index % 3 === 1) {
          return (
            <PostCard
              key={index}
              post={post}
              number={index}
              heightSize={heightSize}
              setHeightSize={setHeightSize}
            />
          );
        }
      });

      const postsC3 = posts.map((post, index) => {
        if (index % 3 === 2) {
          return (
            <PostCard
              key={index}
              post={post}
              number={index}
              heightSize={heightSize}
              setHeightSize={setHeightSize}
            />
          );
        }
      });
      return (
        <>
          <div className="post-list--card__column">{postsC1}</div>
          <div className="post-list--card__column">{postsC2}</div>
          <div className="post-list--card__column">{postsC3}</div>
        </>
      );
    }
    // TODO: componente esqueleto
    return 'loading...';
  };

  return <section className={`post-list post-list--${postType}`}>{renderPosts()}</section>;
}
