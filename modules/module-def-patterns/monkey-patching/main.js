// modules/module-def-patterns/monkey-patching/main.js

require("./file-patcher") // this is just to patch that module we want to use
const logger = require("./file-logger")

logger.customMessage()