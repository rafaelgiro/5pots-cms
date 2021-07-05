/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import clsx from "clsx";
import MdSubtitles from "@meronex/icons/md/MdSubtitles";
import MdFormatQuote from "@meronex/icons/md/MdFormatQuote";
import MdBackspace from "@meronex/icons/md/MdBackspace";

import AddChangeBlock from "./AddChangeBlock";
import AddAbility from "./AddAbility";
import AbilityTitleDev from "./AbilityTitleDev";
import ChangeBlockDev from "./ChangeBlockDev";
import ChangeChampionGoal from "./ChangeChampionGoal";
import Logo from "../../../atoms/Logo";
import Typography from "../../../atoms/Typography";
import ClassIcon from "../../../atoms/Icons/ClassIcon";
import ChangeIcon from "../../../atoms/Icons/ChangeIcon";
import EditContext from "../../../templates/PostEdit/EditContext";

import debouce from "../../../../core/helpers/debouce";
import api from "../../../../core/services/api";
import { defaultAbility, defaultChangeBlock } from "./helpers";

import {
  ChangeIconProps,
  ChangeIconType,
  ClassIconType,
} from "../../../atoms/Icons/interfaces";
import { ChampionChangeDevProps, ChangeBlockProps } from "../interfaces";

import styles from "../styles.module.scss";
import devStyles from "./styles.module.scss";

// TODO dá pra quebrar em menores componentes ainda, ou separar as funções
const ChampionChangeDev = (props: ChampionChangeDevProps) => {
  const {
    change,
    championInfo,
    championSectionIndex,
    championChangeIndex: championIndex,
  } = props;
  const [summary, setSummary] = useState("summary");
  const [champion, setChampion] = useState<Champion>();
  const { postState, setPostState } = useContext(EditContext);
  const sanitazedChampion = championInfo.name.replace(" ", "").replace("'", "");
  const { changes } = change;

  const currentAbilities = championIndex
    ? // @ts-ignore
      postState?.sections[championSectionIndex].champions[
        championIndex
      ].changes.map((c) => c.stat)
    : [];
  const abilitiesMap: AbilityKey[] = ["base", "p", "q", "w", "e", "r"];

  function handleAbilityKey(
    champion: string,
    changeIndex: number,
    newKey: AbilityKey
  ) {
    if (postState && (championIndex || championIndex === 0)) {
      const newPost = { ...postState };
      // @ts-ignore
      newPost.sections[championSectionIndex].champions[championIndex].changes[
        changeIndex
      ].stat = newKey;

      // Ordena
      // @ts-ignore
      newPost.sections[championSectionIndex].champions[
        championIndex
      ].changes.sort(
        (a, b) => abilitiesMap.indexOf(a.stat) - abilitiesMap.indexOf(b.stat)
      );

      setPostState(newPost);
    }
  }

  function deleteAbility(changeIndex: number) {
    if (postState && (championIndex || championIndex === 0)) {
      const newPost = { ...postState };
      // @ts-ignore
      newPost.sections[championSectionIndex].champions[
        championIndex
      ].changes.splice(changeIndex, 1);

      setPostState(newPost);
    }
  }

  function handleBlockType(
    changeIndex: number,
    blockIndex: number,
    newValue: "removed" | "new" | "updated" | "reworked" | "change"
  ) {
    if (postState && (championIndex || championIndex === 0)) {
      const newPost = { ...postState };
      // @ts-ignore
      newPost.sections[championSectionIndex].champions[championIndex].changes[
        changeIndex
      ].blocks[blockIndex].type = newValue;

      setPostState(newPost);
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
      // @ts-ignore
      newPost.sections[championSectionIndex].champions[championIndex].changes[
        changeIndex
      ].blocks[blockIndex][key] = newValue;

      setPostState(newPost);
    }
  }

  const handleBlockChange = debouce(handleBlockChangeText, 600);

  function handleBlockChangeDelete(changeIndex: number, blockIndex: number) {
    if (postState && (championIndex || championIndex === 0)) {
      const newPost = { ...postState };
      // @ts-ignore
      newPost.sections[championSectionIndex].champions[championIndex].changes[
        changeIndex
      ].blocks.splice(blockIndex, 1);

      setPostState(newPost);
    }
  }

  function handleInfo(value: string) {
    const key = summary === "summary" ? "resume" : "context";

    if (postState && (championIndex || championIndex === 0)) {
      const newPost = { ...postState };
      // @ts-ignore
      newPost.sections[championSectionIndex].champions[championIndex][
        key
      ] = value;

      setPostState(newPost);
    }
  }

  const handleHeaderInfo = debouce(handleInfo, 600);

  function addChangeBlock(changeIndex: number) {
    if (postState && (championIndex || championIndex === 0)) {
      const newPost = { ...postState };
      // @ts-ignore
      newPost.sections[championSectionIndex].champions[championIndex].changes[
        changeIndex
      ].blocks.push(defaultChangeBlock);

      setPostState(newPost);
    }
  }

  function addAbility(abilityKey: AbilityKey) {
    if (postState && (championIndex || championIndex === 0)) {
      const newPost = { ...postState };
      // @ts-ignore
      newPost.sections[championSectionIndex].champions[
        championIndex
      ].changes.push({ ...defaultAbility, stat: abilityKey });

      // Ordena
      // @ts-ignore
      newPost.sections[championSectionIndex].champions[
        championIndex
      ].changes.sort(
        (a, b) => abilitiesMap.indexOf(a.stat) - abilitiesMap.indexOf(b.stat)
      );

      setPostState(newPost);
    }
  }

  function changeGoal(newGoal: ChangeIconProps["type"]) {
    if (postState && (championIndex || championIndex === 0)) {
      const newPost = { ...postState };
      // @ts-ignore
      newPost.sections[championSectionIndex].champions[
        championIndex
      ].goal = newGoal as "buff" | "nerf" | "rework" | "adjusted";

      setPostState(newPost);
    }
  }

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
                <ChangeChampionGoal
                  handleGoalChange={changeGoal}
                  championName={champion.championName}
                  goal={change.goal as ChangeIconProps["type"]}
                />
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
              <ChangeChampionGoal
                handleGoalChange={changeGoal}
                championName={champion.championName}
                goal={change.goal as ChangeIconProps["type"]}
              />
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
              <button
                onClick={() => deleteAbility(changeIndex)}
                className={devStyles["remove-ability"]}
              >
                <MdBackspace />
              </button>
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
                      handleBlockChangeDelete={handleBlockChangeDelete}
                    />
                  );
                })}
                <AddChangeBlock
                  addChangeBlock={addChangeBlock}
                  changeIndex={changeIndex}
                />
              </div>
            </div>
          );
        })}
        {currentAbilities && currentAbilities.length < 6 && (
          <AddAbility
            addAbility={addAbility}
            currentAbilities={currentAbilities}
          />
        )}
      </div>
    );

  return null;
};

export default ChampionChangeDev;
