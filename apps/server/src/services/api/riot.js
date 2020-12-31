import axios from "axios";

class RiotApi {
  page(page) {
    return axios.create({
      baseURL: `https://lolstatic-a.akamaihd.net/frontpage/apps/prod/harbinger-l10-website/pt-br/production/pt-br/page-data/${page}/page-data.json`,
    });
  }
}

export default new RiotApi();
