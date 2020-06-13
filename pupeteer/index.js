const puppeteer = require("puppeteer");
const { parse } = require("himalaya");

(async () => {
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
    const news = await page.$$("article");

    const post = news[i];

    const postCat = await post.$eval(
      '[class*="Category"]',
      (el) => el.textContent
    );

    if (postCat === "Dev") {
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
      const author = await page.$eval(
        '[class*="AuthorList"]',
        (el) => el.textContent
      );
      const category = await page.$eval(
        '[class*="MobileCategory"]',
        (el) => el.textContent
      );

      // Array de seções
      const sections = await page.$$eval(".type-article_html", (nodes) => {
        return nodes.map((node) => node.firstChild.innerHTML);
      });

      // Transformar o HTML sem JSON se precisar, mas por enquanto o html de conteúdo é limpo
      // let sectionsJSON = [];

      // for (section of sections) {
      //   sectionsJSON.push(parse(section));
      // }

      console.log({
        title,
        blurb,
        category,
        author,
        sections: sections.length, // JSON.stringify(sectionsJSON)
      });
    }
  }

  await browser.close();
})();
