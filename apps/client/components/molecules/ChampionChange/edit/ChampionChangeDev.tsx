import { useContext, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import clsx from "clsx";
import MdSubtitles from "@meronex/icons/md/MdSubtitles";
import MdFormatQuote from "@meronex/icons/md/MdFormatQuote";

import AbilityTitleDev from "./AbilityTitleDev";
import ChangeBlockDev from "./ChangeBlockDev";
import Logo from "../../../atoms/Logo";
import Typography from "../../../atoms/Typography";
import ClassIcon from "../../../atoms/Icons/ClassIcon";
import ChangeIcon from "../../../atoms/Icons/ChangeIcon";
import EditContext from "../../../templates/PostEdit/EditContext";

import debouce from "../../../../core/helpers/debouce";
import api from "../../../../core/services/api";

import { ChangeIconType, ClassIconType } from "../../../atoms/Icons/interfaces";
import { ChampionChangeDevProps, ChangeBlockProps } from "../interfaces";

import styles from "../styles.module.scss";

const ChampionChangeDev = (props: ChampionChangeDevProps) => {
  const { change, championInfo } = props;
  const [summary, setSummary] = useState("summary");
  const [champion, setChampion] = useState<Champion>();
  const {
    postState,
    setPostState,
    championSectionIndex,
    setHasChanged,
  } = useContext(EditContext);
  const sanitazedChampion = championInfo.name.replace(" ", "").replace("'", "");
  const { changes } = change;
  const championIndex = postState?.sections[
    championSectionIndex
  ].champions.findIndex((c) => c.name === championInfo.name);

  function handleAbilityKey(
    champion: string,
    changeIndex: number,
    newKey: AbilityKey
  ) {
    if (postState && (championIndex || championIndex === 0)) {
      const newPost = { ...postState };
      newPost.sections[championSectionIndex].champions[championIndex].changes[
        changeIndex
      ].stat = newKey;

      setPostState(newPost);
      setHasChanged(true);
    }
  }

  function handleBlockType(
    changeIndex: number,
    blockIndex: number,
    newValue: "removed" | "new" | "updated" | "reworked" | "change"
  ) {
    if (postState && (championIndex || championIndex === 0)) {
      const newPost = { ...postState };
      newPost.sections[championSectionIndex].champions[championIndex].changes[
        changeIndex
      ].blocks[blockIndex].type = newValue;

      setPostState(newPost);
      setHasChanged(true);
    }
  }

  function handleBlockChangeText(
    changeIndex: number,
    blockIndex: number,
    newValue: string,
    key: "attribute" | "before" | "after"
  ) {
    if (postState && (championIndex || championIndex === 0)) {
      const newPost = { ...postState };
      newPost.sections[championSectionIndex].champions[championIndex].changes[
        changeIndex
      ].blocks[blockIndex][key] = newValue;

      setPostState(newPost);
      setHasChanged(true);
    }
  }

  const handleBlockChange = debouce(handleBlockChangeText, 600);

  function handleInfo(value: string) {
    const key = summary === "summary" ? "resume" : "context";

    const championIndex = postState?.sections[
      championSectionIndex
    ].champions.findIndex((c) => c.name === championInfo.name);

    if (postState && (championIndex || championIndex === 0)) {
      const newPost = { ...postState };
      console.log(
        newPost.sections[championSectionIndex].champions[championIndex][key]
      );
      newPost.sections[championSectionIndex].champions[championIndex][
        key
      ] = value;

      setPostState(newPost);
      setHasChanged(true);
    }
  }

  const handleHeaderInfo = debouce(handleInfo, 600);

  useEffect(() => {
    async function getChampion() {
      const res = await api.get(`/champions/${championInfo.name}`);
      setChampion(res.data);
    }

    getChampion();
  }, [championInfo]);

  if (champion)
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
              <Typography className={styles.editable} variant="p" component="p">
                <ContentEditable
                  tagName="span"
                  html={
                    summary === "summary"
                      ? change.resume
                      : `“${change.context}”`
                  }
                  onChange={(e) => handleHeaderInfo(e.target.value)}
                />
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
              <Typography className={styles.editable} variant="p" component="p">
                <ContentEditable
                  tagName="span"
                  html={
                    summary === "summary"
                      ? change.resume
                      : `“${change.context}”`
                  }
                  onChange={(e) => handleHeaderInfo(e.target.value)}
                />
              </Typography>
            </div>
          </div>
        </div>

        {/* Mapeia todas as mudanças habilidade por habilidade */}
        {changes.map((change, changeIndex) => {
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
                <AbilityTitleDev
                  isBase={isBase}
                  abilityKey={abilityKey}
                  abilityName={champion.abilities[abilityKey]}
                  championName={sanitazedChampion}
                  unsanitazedChampion={championInfo.name}
                  changeIndex={changeIndex}
                  handleAbilityKey={debouce(handleAbilityKey, 400)}
                />
              </div>
              {/* Bloco de mudança */}
              <div className={styles["champion-change__change__block"]}>
                {blocks.map((block: ChangeBlockProps["block"], i: number) => {
                  return (
                    <ChangeBlockDev
                      key={`champ-${sanitazedChampion}-block-${i}`}
                      block={block}
                      champion={champion.championName}
                      handleBlockType={handleBlockType}
                      changeIndex={changeIndex}
                      blockIndex={i}
                      handleBlockChange={handleBlockChange}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );

  return null;
};

export default ChampionChangeDev;
