// modules/module-def-patterns/monkey-patching/file-patcher.js

require("./file-logger").customMessage = function() {
  console.log("this is monkey patched functionality")
}