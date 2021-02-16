import PostView from "../../components/templates/PostView";

import api from "../../core/services/api";
import PostContext from "../../core/contexts/PostContext";

import styles from "./styles.module.scss";

function PostPage(props: PostsPageProps) {
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

  const posts: Post[] = res.data.posts;

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug },
  }));

  // We'll pre-render only these paths at build time.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: StaticPropsParams) {
  const postRes = await api.get(`/posts/${params.slug}`);
  const post: Post = postRes.data;

  const championsRes = post.champions
    ? await api.get(`/champions?champions=${post.champions.join()}`)
    : null;
  const champions: Champion = championsRes
    ? championsRes.data.champions
    : championsRes;

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

export default PostPage;
