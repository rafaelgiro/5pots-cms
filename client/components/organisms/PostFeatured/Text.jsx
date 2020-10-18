import MdKeyboardArrowRight from "@meronex/icons/md/MdKeyboardArrowRight";

import Typography from "../../atoms/Typography";

import styles from "./text.styles.module.scss";

const PostFeaturedText = () => {
  // Objeto de post para fins de desenvolvimento
  const post = {
    title: "MAPA DOS CAMPEÕES: JUNHO DE 2020",
    desc:
      "Uma caçadora onírica, um assassino mascarado e um atirador aventureiro. E de quem será a próxima AVM?",
  };

  return (
    <div className={styles["featured-text"]}>
      <Typography
        component="h2"
        variant="h1"
        className={styles["featured-text__title"]}
      >
        {post.title}
      </Typography>
      <Typography
        component="p"
        variant="p"
        className={styles["featured-text__desc"]}
      >
        {post.desc}
      </Typography>
      <div className={styles["featured-text__link-container"]}>
        <Typography
          component="p"
          variant="p"
          className={styles["featured-text__link"]}
        >
          Leia mais
        </Typography>
        <MdKeyboardArrowRight
          className={styles["featured-text__link--arrow"]}
        />
      </div>
    </div>
  );
};

export default PostFeaturedText;
