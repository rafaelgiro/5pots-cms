/* eslint-disable global-require */
if (process.env.NODE_ENV === "production") {
  module.exports = "https://5pots.com";
} else {
  // crie um arquivo dev.js com suas chaves
  module.exports = "http://localhost";
}
