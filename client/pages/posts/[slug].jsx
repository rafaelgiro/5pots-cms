/* eslint-disable react/forbid-prop-types */
import PropTypes, { array, arrayOf, number, shape, string } from "prop-types";
import api from "../../core/services/api";

import PostView from "../../components/templates/PostView";

import styles from "./styles.module.scss";
import PostContext from "../../core/contexts/PostContext";

function PostPage(props) {
  const { post, champions, postContent } = props;
  return (
    <div className={styles["post-page"]}>
      <PostContext.Provider value={{ postContent }}>
        <PostView post={post} champions={champions} />
      </PostContext.Provider>
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await api.get("/posts");
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
  const postRes = await api.get(`/posts/${params.slug}`);
  const post = postRes.data;

  const championsRes = post.champions
    ? await api.get(`/champions?champions=${post.champions.join()}`)
    : null;
  const champions = championsRes ? championsRes.data : championsRes;

  const champChanges = post.sections.map((section) => section.champions)[0];
  const skins = [
    { name: "Ziggs Hextech", id: "Ziggs_23" },
    { name: "Shen PsyOps", id: "Shen_22" },
    { name: "Vi PsyOps", id: "Vi_20" },
    { name: "Ezreal PsyOps", id: "Ezreal_22" },
    { name: "Ezreal PsyOps Edição de Prestígio", id: "Ezreal_23" },
    { name: "Master Yi PsyOps", id: "MasterYi_33" },
    { name: "Sona PsyOps", id: "Sona_17" },
  ];

  // Pass post data to the page via props
  return {
    props: {
      post,
      champions,
      postContent: { champions: champChanges || null, skins },
    },
    revalidate: 60,
  };
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
  champions: PropTypes.arrayOf(
    shape({
      abilities: shape({
        p: string.isRequired,
        q: string.isRequired,
        w: string.isRequired,
        e: string.isRequired,
        r: string.isRequired,
      }).isRequired,
      championName: string.isRequired,
      tags: arrayOf(string).isRequired,
      title: string.isRequired,
    })
  ).isRequired,
  postContent: shape({ skins: array, champions: array }).isRequired,
};

export default PostPage;
