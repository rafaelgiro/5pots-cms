const mongoose = require("mongoose");
require("../models/Post");
const jsdom = require("jsdom");
const Post = mongoose.model("posts");
const util = require("util");

async function singleChangeJSON(htmlChange) {
  // Pega os elementos HTML
  const attributeHTML = htmlChange.querySelector(".attribute");
  const attributeBeforeHTML = htmlChange.querySelector(".attribute-before");
  const attributeAfterHTML = htmlChange.querySelector(".attribute-after");
  // Checa se existem antes de pegar o HTML
  const attribute = attributeHTML ? attributeHTML.textContent : null;
  const attributeBefore = attributeBeforeHTML
    ? attributeBeforeHTML.textContent
    : null;
  const attributeAfter = attributeAfterHTML
    ? attributeAfterHTML.textContent
    : null;

  // Pega o tipo da mudança
  const newRegex = /^novo/i;
  const updatedRegex = /^atualizado/i;
  const removedRegex = /^removido/i;
  let attributeType = "change";
  if (attribute.match(newRegex)) attributeType = "new";
  else if (attribute.match(updatedRegex)) attributeType = "updated";
  else if (attribute.match(removedRegex)) attributeType = "removed";

  // Retorna a mudança tratada
  return Promise.resolve({
    attribute: attribute
      .replace(newRegex, "")
      .replace(updatedRegex, "")
      .replace(removedRegex, ""),
    attributeBefore,
    attributeAfter,
    attributeType,
  });
}

async function championChange(htmlString) {
  // Transforma a string em um DOM
  const dom = new jsdom.JSDOM(`<!DOCTYPE html>${htmlString}`);
  // Pega as infos fáceis
  const name = dom.window.document.querySelector("h3").textContent;
  const summary = dom.window.document.querySelector(".summary").textContent;
  const context = dom.window.document.querySelector(".context").textContent;

  // Cria um array de mudança com os headings e divs
  const changes = Array.from(
    dom.window.document.querySelectorAll(
      ".change-detail-title, .attribute-change"
    )
  );

  // Inicia o Array das habilidades
  let championProp = [];
  let i = -1;

  // Mapeia as mudanças
  for (const htmlEl of changes) {
    // Pra cada título cria um objeto novo no array
    if (htmlEl.nodeName === "H4") {
      i++;
      championProp.push({ title: htmlEl.textContent, changes: [] });
    } else {
      // Para cada mudança extrai os dados
      championProp[i].changes.push(await singleChangeJSON(htmlEl));
    }
  }

  return Promise.resolve({ name, summary, context, changes: championProp });
}

async function jsonfyChanges(html, i, sections, isHeader) {
  // Se for header cria o objeto da seção
  if (isHeader) {
    sections[i] = { header: html.replace(/(\t|\n)/gi, ""), content: [] };
  } else {
    // Tira os HTML zoado
    let content = html.replace(/(\t|\n)/gi, "");
    // Se for campeão deixa num formato mais bonitinho pra fazer frescura depois no front
    if (sections[i].header === "Campeões")
      content = await championChange(content);
    //Senão só da um push no array de conteúdo
    sections[i].content.push(content);
  }

  return Promise.resolve();
}

async function notes(post, page) {
  //post.click(); // Entra no Post

  await page.waitForSelector('[class*="DetailsWrapper"]');

  const title = await page.$eval('[class*="Title"]', (el) => el.textContent);
  // Checa se é notas do LoL
  if (
    title.includes("Notas da Atualização") &&
    !title.includes("Teamfight Tactics")
  ) {
    let author;
    try {
      author = await page.$eval('[class*="Meta"]', (el) => {
        return el.querySelector('[class*="AuthorList"]').textContent;
      });
    } catch (err) {
      author = "Riot Games";
    }

    const category = "notes";
    const img = await page.$eval('[class*="NoScriptImg"]', (el) =>
      el.getAttribute("src")
    );
    const postedAt = await page.$eval("time", (el) =>
      el.getAttribute("datetime")
    );
    const url = page.url();

    // Pega todos os Headers + Blocos
    // Mapeia esse Array retornando os Headers e os blocos com index do header
    // Aí eu tenho as divs que pertencem a esse header
    const content = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          "#patch-notes-container > .header-primary, #patch-notes-container > .content-border"
        ),
        (e) => e.innerHTML
      )
    );

    let i = -1;
    const sections = [];

    Promise.all(
      content.map((contentHTML) => {
        let html = contentHTML;
        let isHeader = false;
        if (contentHTML.includes("<h2")) {
          i += 1;
          html = contentHTML.replace(/(<h2 .*">|<\/h2>)/gi, "");
          isHeader = true;
        }
        return jsonfyChanges(html, i, sections, isHeader);
      })
    ).then(() => {
      console.log(util.inspect(sections, false, null, true));
      Promise.resolve();
    });
  }
}

module.exports = notes;
