/* eslint-disable global-require */
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  // crie um arquivo dev.js com suas chaves
  module.exports = require("./dev");
}
