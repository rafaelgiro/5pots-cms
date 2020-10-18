import styles from "./image.styles.module.scss";

const PostFeaturedImage = () => {
  return (
    <div className={styles["featured-image-container"]}>
      <div
        className={`${styles["featured-image"]} ${styles["featured-image-1"]}`}
      />
      <div
        className={`${styles["featured-image"]} ${styles["featured-image-2"]}`}
      />
      <div
        className={`${styles["featured-image"]} ${styles["featured-image-3"]}`}
      />
    </div>
  );
};

export default PostFeaturedImage;
