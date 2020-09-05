const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
require("./models/Post");

const keys = require("./config/keys");
const Post = mongoose.model("posts");

(async () => {
  await mongoose.connect(keys.mongoURI || "mongodb://db:27017/5pots-dev", {
    useNewUrlParser: true,
  });

  // Inicia o browser, mudar headless pra falso para ver o chrome abrir
  const browser = await puppeteer.launch({
    headless: false,
  });

  // Abre uma aba nova com um user agent pra não ser bot
  const page = await browser.newPage();
  page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );

  // Navega notícia por notícia
  for (let i = 0; i < 12; i++) {
    // Vai pro site de notícias do LoL e só espera o dom carregar
    await page.goto("https://br.leagueoflegends.com/pt-br/latest-news/", {
      waitUntil: "domcontentloaded",
    });
    // Espera as notícias serem renderizadas
    await page.waitForSelector("article");
    // Pega as notícias
    const news = await page.$$('[class*="Item"]');

    const post = news[i];

    // Garante que o link é local do site oficial
    const link = await post.evaluate((a) =>
      a.querySelector("a").getAttribute("href")
    );
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    const outsideLike = link && link.match(regex);

    const postCat = await post.$eval(
      '[class*="Category"]',
      (el) => el.textContent
    );

    if (postCat === "Dev" && !outsideLike) {
      post.click(); // Entra no Post

      await page.waitForSelector(".type-article_header");

      const title = await page.$eval(
        '[class*="Title"]',
        (el) => el.textContent
      );
      const blurb = await page.$eval(
        '[class*="Blurb"]',
        (el) => el.textContent
      );
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
          const titleEl = node.querySelectorAll("h1, h2, h3, h4, h5, h6");
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
          const titleEl = node.querySelectorAll("h1, h2, h3, h4, h5, h6");
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
        (err, newPost) => (err ? console.log(err) : console.log(newPost))
      );
    }
  }

  await browser.close();
})();
