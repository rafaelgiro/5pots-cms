/* eslint-disable react/jsx-one-expression-per-line */

import PropTypes from "prop-types";
import Typography from "../../atoms/Typography";
import BuffIcon from "../../atoms/Icons/BuffIcon";

import styles from "./styles.module.scss";

import ChangeBlock from "./ChangeBlock";

const ChampionChange = (props) => {
  const temp = {
    base: {
      title: "Atributos Base",
      img: "",
    },
    p: {
      title: "PASSIVA - GRACIOSIDADE VASTAYA",
      // img:
      //   "https://am-a.akamaihd.net/image?f=http://ddragon.leagueoflegends.com/cdn/10.16.1/img/passive/Ahri_SoulEater2.png",
    },
    q: {
      title: "Q - ORBE DA ILUSÃO",
      // img:
      //   "https://am-a.akamaihd.net/image?f=http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/AhriOrbofDeception.png",
    },
    w: {
      title: "W - FOGO DE RAPOSA",
      // img:
      //   "https://am-a.akamaihd.net/image?f=http://ddragon.leagueoflegends.com/cdn/10.16.1/img/spell/AhriFoxFire.png",
    },
  };

  const { champ } = props;
  return (
    <div className={styles["champion-change"]}>
      <div className={styles["champion-change__header"]}>
        <img
          src={`https://f002.backblazeb2.com/file/cincopots/champions/${champ.name}.png`}
          alt={champ.name}
        />
        <BuffIcon />
        <div>
          <Typography variant="h3" component="h4">
            {champ.name}
          </Typography>
          <Typography variant="p" component="p">
            {champ.resume}
          </Typography>
        </div>
      </div>

      {/* <blockquote>{champ.context}</blockquote> */}
      {champ.changes.map((ability) => {
        const abilityKey = Object.keys(ability)[0];
        const abilityIcon =
          abilityKey !== "base" &&
          `https://f002.backblazeb2.com/file/cincopots/abilities/${
            champ.name
          }${abilityKey.toUpperCase()}.png`;
        return (
          <div className={styles["champion-change__change"]}>
            <div className={styles["champion-change__change__name"]}>
              {abilityIcon && <img src={abilityIcon} alt="ablt" />}
              <Typography variant="h4" component="h5">
                {temp[abilityKey].title}
              </Typography>
            </div>
            <div className={styles["champion-change__change__block"]}>
              {Object.values(ability)
                .flat()
                .map((block) => {
                  return <ChangeBlock block={block} champion={champ.name} />;
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

ChampionChange.propTypes = {
  champ: PropTypes.shape({
    name: PropTypes.string,
    resume: PropTypes.string,
    context: PropTypes.string,
    changes: PropTypes.arrayOf(),
  }).isRequired,
};

export default ChampionChange;
