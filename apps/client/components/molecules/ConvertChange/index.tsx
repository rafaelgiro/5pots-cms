import JSSoup from "jssoup";
import { useState } from "react";

import JSONEditor from "../../atoms/JSONEditor";
import ChampionChange from "../ChampionChange";

import styles from "./styles.module.scss";

const ConvertChange = () => {
  const [result, setResult] = useState({});
  function handleChange(val: string) {
    console.log(val);
  }

  function handlePaste(e: ClipboardEvent) {
    const text = e.clipboardData?.getData("text/html");
    const soup = new JSSoup(text);

    const name = soup.find("b").getText();
    const changes: {
      [x: string]: {
        attribute: string;
        before: string;
        after: string;
        type: string;
      }[];
    }[] = [];

    function mapChange(soupEl: any) {
      const abilitySoup = soupEl.find("ul");
      const isAbility = Boolean(abilitySoup.find("b"));

      const abilityKey: string = isAbility
        ? abilitySoup
            .find("b")
            .getText()
            .match(/\(([^)]+)\)/)[1]
            .split("")[0]
            .toLowerCase()
        : "base";

      // if (isAbility) {
      const changeArr = isAbility
        ? abilitySoup.find("ul").findAll("li")
        : abilitySoup.findAll("li");

      const abilityChanges = changeArr.map((changeSoup: any) => {
        const changeText = changeSoup.getText().split("from");
        const attribute: string = changeText[0].trim();
        const before: string = changeText[1].split("to")[0].trim();
        const after: string = changeText[1].split("to")[1].trim();
        const type = "change";

        return { attribute, before, after, type };
      });

      changes.push({ [abilityKey]: abilityChanges });
      // }
      return { name, changes };
    }

    //   .getText()
    //   .split("from");

    // const attribute: string = changeArr[0].trim();
    // const before: string = changeArr[1].split("to")[0].trim();
    // const after: string = changeArr[1].split("to")[1].trim();
    // const type = "change";

    // changes.push({ [abilityKey]: [{ attribute, before, after, type }] });

    // Se tem outra mudança na habilidade
    // if (soupEl.find("li").nextSibling.name === "li") {
    // console.log(abilitySoup.find("li").getText());
    // mapChange(soupEl.find("li").nextSibling, abilityKey);
    // }
    // }
    // }

    // return { name, changes };
    // }

    // mapChange(soup);
    setResult(mapChange(soup));
  }

  return (
    <div className={styles["convert-change"]}>
      <textarea
        rows={10}
        className={styles["convert-change__text"]}
        // onChange={(e) => handleChange(e.target.value)}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onPaste={(e) => handlePaste(e)}
      />
      <div>
        <JSONEditor json={result} setJson={setResult} />
      </div>
    </div>
  );
};

export default ConvertChange;
