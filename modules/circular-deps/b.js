// modules/circular-deps/b.js

exports.loaded = false;

const a = require("./a")
module.exports = {
  a,
  loaded: true // this overrides the previous export
}