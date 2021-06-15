import { useContext, useState } from "react";
import Link from "next/link";

import Button from "../../atoms/Button";
import Typography from "../../atoms/Typography";
import Post, { PostSkeleton } from "../../molecules/Post";
import AuthContext from "../../../core/contexts/AuthContext";
import UIContext from "../../../core/contexts/UIContext";

import { createMock } from "./helpers";

import { PostListProps } from "./interfaces";

import styles from "./styles.module.scss";

const PostList = (props: PostListProps) => {
  const { posts } = props;
  const [currentPosts, setCurrentPosts] = useState(posts);
  const { uiDispatch: dispatch } = useContext(UIContext);
  const { user } = useContext(AuthContext);

  const updatePosts = () => {
    createMock()
      .then((res) => {
        setCurrentPosts([res.data]);
        dispatch({
          type: "SHOW_SNACKBAR",
          snackbar: {
            msg: "Post criado com sucesso!",
            variant: "success",
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "SHOW_SNACKBAR",
          snackbar: {
            msg: err.response.data.message,
            variant: "error",
          },
        });
      });
  };

  // Renderiza os posts
  const renderPosts = () => {
    if (currentPosts?.length === 0 && !user) {
      return (
        <div className={styles["new-post"]}>
          <Typography variant="h3" component="h5">
            Faça seu login ou crie uma conta!
          </Typography>
          <Link href="/auth/register">
            <a>
              <Button>Registrar</Button>
            </a>
          </Link>
        </div>
      );
    }

    if (currentPosts?.length === 0 && user) {
      return (
        <div className={styles["new-post"]}>
          <Typography variant="h3" component="h5">
            Crie o seu primeiro post!
          </Typography>
          <Button onClick={updatePosts}>Criar post de exemplo</Button>
        </div>
      );
    }

    // Verifica se os posts foram carregados
    if (currentPosts) {
      const postsList = currentPosts.map((post) => {
        return <Post key={post.slug} post={post} />;
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
    <section className={styles["post-list"]}>
      <div className={styles["post-list__controller"]}>
        <div>
          <Typography
            className={styles["stories__controller__sub-title"]}
            component="p"
            variant="p"
          >
            Todas as
          </Typography>
          <Typography
            className={styles.stories__controller__title}
            component="p"
            variant="p"
          >
            Postagens
          </Typography>
        </div>
        <Typography
          className={styles.stories__controller__desc}
          component="p"
          variant="p"
        >
          Confira o restante das postagens da 5pots em ordem cronológica.
        </Typography>
      </div>
      <div className={styles["post-list__cards-container"]}>
        {renderPosts()}
      </div>
    </section>
  );
};

export default PostList;
