import { useContext } from "react";
import clsx from "clsx";
import MdTurnedIn from "@meronex/icons/md/MdTurnedIn";

import SectionIcon from "../../atoms/Icons/SectionIcon";
import Typography from "../../atoms/Typography";
import SectionTitle from "../../atoms/SectionTitle";
import ChampionsChanges from "./ChampionChanges";

import PostContext from "../../../core/contexts/PostContext";

import styles from "./styles.module.scss";

const PostSummary = () => {
  const { postContent } = useContext(PostContext);
  const { champions, skins } = postContent;

  return (
    <div className={styles["post-summary"]}>
      <SectionTitle title="Destaques">
        <MdTurnedIn />
      </SectionTitle>
      <div className={styles["post-summary__changes"]}>
        <ChampionsChanges changes={champions} type="buff" />
        <ChampionsChanges changes={champions} type="nerf" />
        <ChampionsChanges changes={champions} type="adjust" />
        <ChampionsChanges changes={champions} type="rework" />
      </div>

      <div className={styles["post-summary__skins"]}>
        <div className={clsx(styles["champion-changes__title"])}>
          <SectionIcon section="skins" />
          <Typography variant="h4" component="h4">
            NOVAS SKINS
          </Typography>
        </div>
        <div className={styles["post-summary__skins__splashes"]}>
          {skins.map((skin) => (
            <div key={skin.id}>
              <Typography component="p" variant="sub">
                {skin.name}
              </Typography>
              <img
                src={`https://f002.backblazeb2.com/file/cincopots/splash/${skin.id}.jpg`}
                alt="Splash skin"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostSummary;
