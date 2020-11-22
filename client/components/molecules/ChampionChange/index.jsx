/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import PropTypes, { arrayOf, shape, string } from "prop-types";
import MdSubtitles from "@meronex/icons/md/MdSubtitles";
import MdFormatQuote from "@meronex/icons/md/MdFormatQuote";

import Typography from "../../atoms/Typography";
import ClassIcon from "../../atoms/Icons/ClassIcon";
import AbilityTitle from "./AbilityTitle";

import styles from "./styles.module.scss";

import ChangeBlock from "./ChangeBlock";
import Logo from "../../atoms/Logo";
import ChangeIcon from "../../atoms/Icons/ChangeIcon";

const ChampionChange = (props) => {
  const { change, champion } = props;
  const [summary, setSummary] = useState("summary");
  const sanitazedChampion = champion.championName
    .replace(" ", "")
    .replace("'", "");

  // TODO: refatorar pra css grid
  return (
    <div className={styles["champion-change"]}>
      <div id={champion.championName} className="anchor" />
      <div className={styles["champion-change__header"]}>
        <div className={styles["champion-change__header__mobile"]}>
          <div>
            <div className={styles["champion-change__header__portrait"]}>
              <img
                src={`https://f002.backblazeb2.com/file/cincopots/champions/${sanitazedChampion}.png`}
                alt={champion.championName}
              />
            </div>
            <div>
              <Typography variant="h3" component="h4">
                {champion.championName}{" "}
              </Typography>
              <div>
                {champion.tags.map((tag) => (
                  <ClassIcon
                    key={`${champion.championName}-${tag}`}
                    tag={tag}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className={clsx(
              styles["champion-change__header__mobile__context"],
              styles["champion-change__header__context"]
            )}
          >
            <div className={styles[`champion-change__header--${summary}`]}>
              <button type="button" onClick={() => setSummary("summary")}>
                <MdSubtitles />
              </button>
              <button type="button" onClick={() => setSummary("context")}>
                <MdFormatQuote />
              </button>
            </div>
            <Typography variant="p" component="p">
              {summary === "summary" ? change.resume : `“${change.context}”`}
            </Typography>
          </div>
        </div>
        <Logo className={styles["champion-change__logo"]} />
        <div
          className={clsx(
            styles["champion-change__header__portrait"],
            styles[`champion-change__header__portrait--${change.goal}`]
          )}
        >
          <img
            src={`https://f002.backblazeb2.com/file/cincopots/champions/${sanitazedChampion}.png`}
            alt={champion.championName}
          />
          <div>
            <ChangeIcon type={change.goal} />{" "}
            {/* <span> {change.goal === "adjust" ? "ajuste" : change.goal}</span> */}
          </div>
        </div>
        <div className={styles["champion-change__header__desktop"]}>
          <Typography variant="h3" component="h4">
            {champion.championName}{" "}
            {champion.tags.map((tag) => (
              <ClassIcon key={`${champion.championName}-${tag}`} tag={tag} />
            ))}
          </Typography>

          <div className={styles["champion-change__header__context"]}>
            <div className={styles[`champion-change__header--${summary}`]}>
              <button type="button" onClick={() => setSummary("summary")}>
                <MdSubtitles />
              </button>
              <button type="button" onClick={() => setSummary("context")}>
                <MdFormatQuote />
              </button>
            </div>
            <Typography variant="p" component="p">
              {summary === "summary" ? change.resume : `“${change.context}”`}
            </Typography>
          </div>
        </div>
      </div>

      {/* Mapeia todas as mudanças habilidade por habilidade */}
      {change.changes.map((ability) => {
        const abilityKey = Object.keys(ability)[0];
        const isBase = abilityKey === "base";
        const abilityIcon =
          !isBase &&
          `https://f002.backblazeb2.com/file/cincopots/abilities/${sanitazedChampion}${abilityKey.toUpperCase()}.png`;
        return (
          <div
            key={`${champion.championName}-${abilityKey}`}
            className={styles["champion-change__change"]}
          >
            <div className={styles["champion-change__change__name"]}>
              {abilityIcon && (
                <img src={abilityIcon} alt="imagem da habilidade" />
              )}
              {/* Nome da habilidade */}
              <AbilityTitle
                isBase={isBase}
                abilityKey={abilityKey}
                abilityName={champion.abilities[abilityKey]}
                championName={sanitazedChampion}
              />
            </div>
            {/* Bloco de mudança */}
            <div className={styles["champion-change__change__block"]}>
              {Object.values(ability)
                .flat()
                .map((block, i) => {
                  return (
                    <ChangeBlock
                      key={`champ-${sanitazedChampion}-block-${i}`}
                      block={block}
                      champion={champion.championName}
                    />
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

ChampionChange.propTypes = {
  change: PropTypes.shape({
    name: PropTypes.string,
    resume: PropTypes.string,
    context: PropTypes.string,
    changes: PropTypes.array,
    goal: string,
  }).isRequired,
  champion: shape({
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
  }).isRequired,
};

export default ChampionChange;
