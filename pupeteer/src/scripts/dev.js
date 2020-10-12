const mongoose = require("mongoose");
require("../models/Post");
const Post = mongoose.model("posts");

async function dev(post, page) {
  post.click(); // Entra no Post

  await page.waitForSelector(".type-article_header");

  const title = await page.$eval('[class*="Title"]', (el) => el.textContent);
  const blurb = await page.$eval('[class*="Blurb"]', (el) => el.textContent);
  let author;
  try {
    author = await page.$eval('[class*="Meta"]', (el) => {
      return el.querySelector('[class*="AuthorList"]').textContent;
    });
  } catch (err) {
    author = "Riot Games";
  }

  const category = await page.$eval('[class*="MobileCategory"]', (el) =>
    el.textContent.toLowerCase()
  );
  const img = await page.$eval('[class*="NoScriptImg"]', (el) =>
    el.getAttribute("src")
  );
  const postedAt = await page.$eval("time", (el) =>
    el.getAttribute("datetime")
  );
  const url = page.url();

  // Array de seções
  const sections = await page.$$eval(".type-article_html", (nodes) => {
    return nodes.map((node, index) => {
      const titleEl = node.querySelectorAll("h2, h3, h4, h5, h6");
      let titles = [];
      for (let i = 0; i < titleEl.length; i++) {
        titles.push(titleEl[i].innerText);
      }

      const content = node.firstChild.innerHTML;

      return { titles, content };
    });
  });

  const subTitles = await page.$$eval(".type-article_html", (nodes) => {
    return nodes.map((node, index) => {
      const titleEl = node.querySelectorAll("h2, h3, h4, h5, h6");
      let titles = [];
      for (let i = 0; i < titleEl.length; i++) {
        titles.push(titleEl[i].innerText);
      }

      return titles;
    });
  });

  // Transformar o HTML sem JSON se precisar, mas por enquanto o html de conteúdo é limpo
  // let sectionsJSON = [];

  // for (section of sections) {
  //   sectionsJSON.push(parse(section));
  // }

  Post.create(
    {
      title,
      img,
      blurb,
      category,
      author,
      sections,
      subTitles: subTitles && subTitles.flat(9999),
      url,
      postedAt,
    },
    (err, newPost) => (err ? Promise.reject(err) : Promise.resolve(newPost))
  );
}

module.exports = dev;
