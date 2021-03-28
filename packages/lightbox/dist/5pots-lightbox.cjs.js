'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./5pots-lightbox.cjs.prod.js");
} else {
  module.exports = require("./5pots-lightbox.cjs.dev.js");
}
