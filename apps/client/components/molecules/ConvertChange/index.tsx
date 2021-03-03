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

    // console.log(text);

    const name = soup.find("b").getText();
    const changes: {
      [x: string]: {
        attribute: string;
        before: string;
        after: string;
        type: string;
      }[];
    }[] = [{ base: [] }, { p: [] }, { q: [] }, { w: [] }, { e: [] }, { r: [] }];
    const keyMap = ["base", "p", "q", "w", "e", "r"];

    function mapChange(soupEl: any) {
      const abilitySoup = soupEl.findAll("li");

      let abilityKey = "base";

      for (let i = 0; i < abilitySoup.length; i++) {
        const changeSoup = abilitySoup[i];
        if (changeSoup.find("b")) {
          abilityKey = changeSoup
            .find("b")
            .getText()
            .match(/\(([^)]+)\)/)[1]
            .split("")[0]
            .toLowerCase();
        } else {
          const changeText = changeSoup.getText().split("from");
          const attribute: string = changeText[0].trim();
          const before: string = changeText[1]
            ? changeText[1].split("to")[0].trim()
            : changeText[0].trim();
          const after: string = changeText[1]
            ? changeText[1].split("to")[1].trim()
            : changeText[0].trim();
          const type = "change";

          const index = keyMap.indexOf(abilityKey);
          changes[index][abilityKey].push({ attribute, before, after, type });

          console.log({ [abilityKey]: { attribute, before, after, type } });
        }
      }

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
