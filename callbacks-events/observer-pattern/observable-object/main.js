import { EventEmitter } from 'evets';
import { readFile } from 'fs';


class FindRegex extends EventEmitter {
  constructor(regex) {
    super()
    this.regex = regex
    this.files = []
  }

  addFile(file) {
    this.files.push(file)
    // here we return the whole instance again
    return this
  }

  find() {
    for (const file of this.files) {
      readFile(file, "utf-8", (err, content) => {
        if(err) {
          return this.emit("error", err)
        }

        this.emit("fileread", file)

        const match = content.match(this.regex)
        if(match) {
          match.forEach(elem => this.emit("found", file, elem))
        }
      })
    }

    return this
  }
}

const findRegexInstance = new FindRegex(/hello \w/)

findRegexInstance
.addFile("fileA.txt")
.addFile("fileB.json")
// here we find the existing regex in files that we found 
.find()
// and now we listen for results 
.on("found", (file, match) => console.log(`Matched "${match}" in file ${file}`))
.on("error", (error) => console.error(`Error emitted: "${err.message}"`))