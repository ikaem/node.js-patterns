// modules/module-def-patterns/class-export/main.js

const Logger = require("./file-logger")


const dbLogger = new Logger("DB")
dbLogger.info("info")

const accessLogger = new Logger("Access")
accessLogger.verbose("verbose")