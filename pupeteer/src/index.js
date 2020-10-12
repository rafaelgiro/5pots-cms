const puppeteer = require("puppeteer");
const mongoose = require("mongoose");

const keys = require("./config/keys");

const dev = require("./scripts/dev");
const notes = require("./scripts/notes");

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
    const outsideLink = link && link.match(regex);

    const postCat = await post.$eval(
      '[class*="Category"]',
      (el) => el.textContent
    );

    if (!outsideLink) {
      switch (postCat) {
        case "Dev":
          await dev(post, page);
          break;
        // case "Atualizações do jogo":
        //   await notes(post, page);
        default:
          break;
      }
    }
  }

  console.log("terminou de crawlar");

  // browser.close();
})();
