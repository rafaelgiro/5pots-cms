import dynamic from "next/dynamic";

import PostFeatured from "../../components/organisms/PostFeatured";

import { handleErrorConsole } from "../../core/helpers/handleErrorConsole";
import api from "../../core/services/api";

import styles from "./styles.module.scss";

const StoriesCards = dynamic(
  () => import("../../components/organisms/StoriesCards")
);
const Sidebar = dynamic(() => import("../../components/organisms/Sidebar"));
const PostList = dynamic(() => import("../../components/organisms/PostList"));
const Footer = dynamic(() => import("../../components/organisms/Footer"));

const Homepage = (props: HomeProps) => {
  const { posts } = props;
  return (
    <main className={styles.homepage}>
      <PostFeatured />
      <StoriesCards />
      <div className={styles["main-content"]}>
        <PostList posts={posts} />
        <Sidebar />
      </div>
      <Footer />
    </main>
  );
};

export async function getStaticProps() {
  let posts: Post[] = [];

  try {
    const res = await api.get<{ posts: Post[] }>("/posts");
    posts = res.data.posts;
  } catch (error) {
    handleErrorConsole(error);
  }

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}

export default Homepage;
