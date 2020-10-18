import PropTypes, { number, string } from "prop-types";
import api from "../../core/services/api";

import PostView from "../../components/templates/PostView";

import styles from "./styles.module.scss";

function PostPage(props) {
  const { post } = props;
  return (
    <div className={styles["post-page"]}>
      <PostView post={post} />
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await api.get("http://api:5000/posts");
  const posts = res.data;

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  // We'll pre-render only these paths at build time.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const res = await api.get(`http://api:5000/posts/${params.slug}`);
  const post = res.data;

  // Pass post data to the page via props
  return { props: { post }, revalidate: 60 };
}

PostPage.propTypes = {
  post: PropTypes.shape({
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
  }).isRequired,
};

export default PostPage;
