import { useState } from "react";
import clsx from "clsx";
import MdSubtitles from "@meronex/icons/md/MdSubtitles";
import MdFormatQuote from "@meronex/icons/md/MdFormatQuote";

import AbilityTitle from "./AbilityTitle";
import ChangeBlock from "./ChangeBlock";
import Logo from "../../atoms/Logo";
import Typography from "../../atoms/Typography";
import ClassIcon from "../../atoms/Icons/ClassIcon";
import ChangeIcon from "../../atoms/Icons/ChangeIcon";

import { ChampionChangeProps, ChangeBlockProps } from "./interfaces";

import styles from "./styles.module.scss";
import { ChangeIconType, ClassIconType } from "../../atoms/Icons/interfaces";

const ChampionChange = (props: ChampionChangeProps) => {
  const { change, champion } = props;
  const [summary, setSummary] = useState("summary");
  const sanitazedChampion = champion.championName
    .replace(" ", "")
    .replace("'", "");
  const { changes } = change;

  // TODO: refatorar pra css grid
  return (
    <div className={styles["champion-change"]}>
      <div id={champion.championName} className="anchor" />
      <div className={styles["champion-change__header"]}>
        <div className={styles["champion-change__header__mobile"]}>
          <div>
            <div className={styles["champion-change__header__portrait"]}>
              <img
                src={`https://assets.5pots.com/file/cincopots/champions/${sanitazedChampion}.png`}
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
                    tag={tag as ClassIconType}
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
            src={`https://assets.5pots.com/file/cincopots/champions/${sanitazedChampion}.png`}
            alt={champion.championName}
          />
          <div>
            <ChangeIcon type={change.goal as ChangeIconType} />{" "}
            {/* <span> {change.goal === "adjust" ? "ajuste" : change.goal}</span> */}
          </div>
        </div>
        <div className={styles["champion-change__header__desktop"]}>
          <Typography variant="h3" component="h4">
            {champion.championName}{" "}
            {champion.tags.map((tag) => (
              <ClassIcon
                key={`${champion.championName}-${tag}`}
                tag={tag as ClassIconType}
              />
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
      {changes.map((change) => {
        const { blocks, stat: abilityKey } = change;
        const isBase = abilityKey === "base";
        const abilityIcon =
          !isBase &&
          `https://assets.5pots.com/file/cincopots/abilities/${sanitazedChampion}${abilityKey.toUpperCase()}.png`;

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
              {blocks.map((block: ChangeBlockProps["block"], i: number) => {
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

export default ChampionChange;
