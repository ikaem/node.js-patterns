// modules/circular-deps/a.js

exports.loaded = false;

const b = require("./b")
module.exports = {
  b,
  loaded: true // this overrides the previous export
}