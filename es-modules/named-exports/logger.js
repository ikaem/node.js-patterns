// es-modules/named-exports/logger.js

export function log (message) {
  console.log(message)
}

export class Logger {
  constructor(name) {
    this.name = name
  }

  log(message) {
    console.log(`[${this.name}] ${message}`)
  }
}