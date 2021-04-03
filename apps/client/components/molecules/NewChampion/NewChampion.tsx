import { useContext } from "react";

import ChampionChange from "../ChampionChange";
import Typography from "../../atoms/Typography";
import SectionIcon from "../../atoms/Icons/SectionIcon";
import SectionTitle from "../../atoms/SectionTitle";
import Section from "../../organisms/Section";
import styles from "../../organisms/PatchNotesSections/styles.module.scss";

import gwen from "./gwen.json";
import UIContext from "../../../core/contexts/UIContext";

const NewChampion = () => {
  const { uiDispatch: dispatch } = useContext(UIContext);
  return (
    <Section className={styles["post-section"]}>
      <SectionTitle title="Nova Campeã - Gwen">
        <SectionIcon section="champions" />
      </SectionTitle>
      <button
        style={{ width: "100%" }}
        onClick={() =>
          dispatch({
            type: "SHOW_LIGHTBOX",
            lightbox: {
              images: [
                "https://assets.5pots.com/file/cincopots/splash/Gwen_0.jpg",
              ],
              current: 0,
            },
          })
        }
      >
        <img
          width="100%"
          height="auto"
          src="https://assets.5pots.com/file/cincopots/splash/Gwen_0.jpg"
        />
      </button>
      <Typography style={{ margin: "2rem 0" }} component="p" variant="p">
        Retalhe e perfure seus inimigos com Gwen, a Costureira Encantada que
        está disponível para testes no PBE! Confira detalhes das habilidades
        logo abaixo:
      </Typography>
      <ChampionChange
        champion={{
          championName: "Gwen",
          tags: ["Mage"],
          title: "a Costureira Encantada",
          abilities: {
            p: "Mil Retalhos",
            q: "Corte e Recorte",
            w: "Névoa Sagrada",
            e: "Avanço Afiado",
            r: "Ponto-Cruz",
          },
        }}
        change={gwen as ChampionChange}
      />
    </Section>
  );
};

export default NewChampion;
