import FaTwitterSquare from "@meronex/icons/fa/FaTwitterSquare";
import FaFacebookSquare from "@meronex/icons/fa/FaFacebookSquare";
import FaDiscord from "@meronex/icons/fa/FaDiscord";

import Typography from "../../atoms/Typography";

import styles from "./styles.module.scss";

const SidebarSocialMedia = () => {
  return (
    <div className={styles["sidebar-social"]}>
      <Typography className={styles.sidebar__title} component="h4" variant="h4">
        REDES SOCIAIS
      </Typography>
      <div className={styles["sidebar-social__icons"]}>
        <a href="https://www.facebook.com/5pots/">
          <FaFacebookSquare
            className={styles["sidebar-social__icons--facebook"]}
          />
        </a>
        <a href="https://twitter.com/datFranky">
          <FaTwitterSquare
            className={styles["sidebar-social__icons--twitter"]}
          />
        </a>
        <a href="https://discord.gg/W4uBUns">
          <FaDiscord className={styles["sidebar-social__icons--discord"]} />
        </a>
      </div>
      <Typography className={styles["sidebar-beta"]} component="p" variant="p">
        Me mandem sugestões do que mais colocar aqui na sidebar :D
      </Typography>
    </div>
  );
};

export default SidebarSocialMedia;
