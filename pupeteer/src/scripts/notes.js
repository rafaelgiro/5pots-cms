const mongoose = require("mongoose");
require("../models/Post");
const Post = mongoose.model("posts");

async function jsonfyChanges(html, i, sections, isHeader) {
  // Se for header cria o objeto da seção
  if (isHeader) {
    sections[i] = { header: html.replace(/(\t|\n)/gi, ""), content: [] };
  } else {
    //Senão só da um push no array de conteúdo
    sections[i].content.push(html.replace(/(\t|\n)/gi, ""));
  }

  return Promise.resolve();
}

async function notes(post, page) {
  post.click(); // Entra no Post

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
    console.log(img);

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
      console.log(sections);
      Promise.resolve();
    });
  }
}

module.exports = notes;
