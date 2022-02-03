// modules/module-def-patterns/intance-export/main.js

const logger = require("./file-logger")

logger.log("some message")


// getting around expring only instance to define a new instance 
const customLogger = new logger.constructor("custom constructor")
customLogger.log("Custom log")
