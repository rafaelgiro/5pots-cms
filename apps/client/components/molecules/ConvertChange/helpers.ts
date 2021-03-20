import JSSoup from "jssoup";

export function fromRiot(e: ClipboardEvent) {
  const text = e.clipboardData?.getData("text/html");
  const soup = new JSSoup(text);

  // Acha nome do campeão e faz captalização pra quem tem espaço e boneco do void
  const champion = soup
    .find("h3")
    .getText()
    .toLowerCase()
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .split("'")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("'");

  const resume = soup.find("p", { class: "summary" }).getText();
  const context = soup.find("blockquote").getText();

  const changes: ChampionChange["changes"] = [];

  let currElement = soup.nextElement;
  const abilityMap = ["base", "p", "q", "w", "e", "r"];
  const abilityRegex = ["ATRIBUTOS", "PASSIVA", "Q", "W", "E", "R"];

  while (currElement) {
    if (currElement.name === "h4") {
      // Pega a primeira palavra e pega só a chave da mudança
      const abilityIndex = abilityRegex.indexOf(
        currElement.getText().split(" ")[0]
      );
      changes.push({
        stat: abilityMap[abilityIndex].toLowerCase() as AbilityKey,
        blocks: [],
      });
    }

    if (currElement.attrs?.class === "attribute-change") {
      const attribute =
        currElement.find("span", { class: "attribute" })?.getText() || "";

      const before =
        currElement.find("span", { class: "attribute-before" })?.getText() ||
        "";

      const after =
        currElement.find("span", { class: "attribute-after" })?.getText() || "";

      const type =
        currElement.find("span").find("span")?.attrs.class || "change";

      changes[changes.length - 1].blocks.push({
        attribute,
        type,
        before,
        after,
      });
    }

    currElement = currElement.nextElement;
  }

  const championChange: ChampionChange = {
    name: champion,
    context,
    resume,
    goal: "adjusted",
    changes,
  };

  return championChange;
}

export function fromSurrender(e: ClipboardEvent) {
  const text = e.clipboardData?.getData("text/html");
  const soup = new JSSoup(text);

  const champion = soup.find("b").getText().trim();

  // Pega todos os itens
  const listItems = soup.findAll("li");
  const changes: ChampionChange["changes"] = [];
  const mappedAbilities: AbilityKey[] = [];

  listItems.map((li: any, index: number) => {
    const text = li.getText();
    const abilityMap = ["base", "p", "q", "w", "e", "r"];

    // Faz o regex pra ver se é uma habilidade nova
    const abilityRegex = /\(([^)]+)\)/;
    const abilityKey: AbilityKey | null =
      text.match(abilityRegex) && text.match(abilityRegex)
        ? text.match(abilityRegex)[1][0].toLowerCase()
        : null;
    const validAbility = abilityKey && abilityMap.includes(abilityKey);

    // Checa se o moobeat não quebrou a lista no nome da habilidade
    const sameLine =
      abilityKey && validAbility
        ? text.slice(text.indexOf(")") + 1).trim()
        : null;

    // Se for o primeiro item e não tiver habilidade, é atributo base
    if (index === 0 && !abilityKey && !mappedAbilities.includes("base")) {
      changes.push({ stat: "base", blocks: [] });
      mappedAbilities.push("base");
    } else if (
      abilityKey &&
      !mappedAbilities.includes(abilityKey) &&
      validAbility
    ) {
      changes.push({ stat: abilityKey, blocks: [] });
      mappedAbilities.push(abilityKey);
    }

    if (!validAbility || sameLine) {
      // Se quebrou a linha, pega a substring, senào pula a habilidade
      let changeText: string;
      if (sameLine) changeText = sameLine.split("from");
      else changeText = text.split("from");
      // Mpeaia o texto separando "from" e "to"
      if (changeText[0] && changeText[1] && changeText[1].split("to")) {
        const attribute: string = changeText[0].trim();
        const before: string = changeText[1]
          ? changeText[1].split("to")[0]?.trim()
          : changeText[0].trim();
        const after: string = changeText[1]
          ? changeText[1].split("to")[1]?.trim()
          : changeText[0].trim();
        const type = "change";

        changes[changes.length - 1].blocks.push({
          attribute,
          type,
          before,
          after,
        });
        // Se não conseguir mapear a habilidade coloca como after
      } else {
        changes[changes.length - 1].blocks.push({
          attribute: "ATRIBUTO",
          type: "change",
          before: "",
          after: changeText[0],
        });
      }
    }
  });

  const championChange: ChampionChange = {
    name: champion,
    context: "",
    resume: "",
    goal: "adjusted",
    changes,
  };

  return championChange;
}

// export function fromSurrender(e: ClipboardEvent) {
//   const text = e.clipboardData?.getData("text/html");
//   const soup = new JSSoup(text);

//   // console.log(text);

//   const name = soup.find("b").getText();
//   const changes: ChampionChange["changes"] = [
//     { stat: "base", blocks: [] },
//     { stat: "p", blocks: [] },
//     { stat: "q", blocks: [] },
//     { stat: "w", blocks: [] },
//     { stat: "e", blocks: [] },
//     { stat: "r", blocks: [] },
//   ];
//   const keyMap = ["base", "p", "q", "w", "e", "r"];

//   function mapChange(soupEl: any) {
//     const abilitySoup = soupEl.findAll("li");

//     let abilityKey = "base";

//     for (let i = 0; i < abilitySoup.length; i++) {
//       const changeSoup = abilitySoup[i];
//       if (changeSoup.find("b")) {
//         abilityKey = changeSoup
//           .find("b")
//           .getText()
//           .match(/\(([^)]+)\)/)[1]
//           .split("")[0]
//           .toLowerCase();
//       } else {
//         const changeText = changeSoup.getText().split("from");
//         const attribute: string = changeText[0].trim();
//         const before: string = changeText[1]
//           ? changeText[1].split("to")[0].trim()
//           : changeText[0].trim();
//         const after: string = changeText[1]
//           ? changeText[1].split("to")[1].trim()
//           : changeText[0].trim();
//         const type = "change";

//         // const index = keyMap.indexOf(abilityKey);
//         // changes[index][abilityKey].push({ attribute, before, after, type });

//         console.log({ abilityKey, attribute, before, after, type });

//         // console.log({ [abilityKey]: { attribute, before, after, type } });
//       }
//     }

//     return { name, changes };
//   }

//   return mapChange(soup);
// }
