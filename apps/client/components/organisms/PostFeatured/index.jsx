import PostFeaturedImage from "./Image";
import PostFeaturedText from "./Text";

import styles from "./styles.module.scss";

const PostFeatured = () => {
  return (
    <section className={styles.featured}>
      <PostFeaturedText />
      <PostFeaturedImage />
    </section>
  );
};

export default PostFeatured;
