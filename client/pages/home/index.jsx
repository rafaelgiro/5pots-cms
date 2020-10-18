import PropTypes, { number, string } from "prop-types";
import dynamic from "next/dynamic";

import PostFeatured from "../../components/organisms/PostFeatured";

import api from "../../core/services/api";

import styles from "./styles.module.scss";

const StoriesCards = dynamic(() =>
  import("../../components/organisms/StoriesCards")
);
const Sidebar = dynamic(() => import("../../components/organisms/Sidebar"));
const PostList = dynamic(() => import("../../components/organisms/PostList"));
const Footer = dynamic(() => import("../../components/organisms/Footer"));

const Homepage = (props) => {
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
  const res = await api.get("http://api:5000/posts");
  const posts = res.data;

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}

Homepage.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      author: string,
      subTitles: PropTypes.arrayOf(string),
      _id: string,
      title: string,
      champions: PropTypes.arrayOf(PropTypes.string),
      img: string,
      blurb: string,
      category: string,
      url: string,
      postedAt: string,
      __v: number,
      slug: string,
    })
  ).isRequired,
};

export default Homepage;
