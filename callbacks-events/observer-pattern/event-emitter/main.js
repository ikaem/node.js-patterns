import { EventEmitter } from 'events';
import { readFile } from 'fs';

// const emitter = new EventEmitter()

function findRegex(files, regex) {
  const emitter = new EventEmitter();

  for (const file of files) {
    readFile(file, 'utf-8', (err, content) => {
      if (err) {
        // so here we just emit an event
        // and we also return, we dont want to do any more stuff
        return emitter.emit('error', err);
      }

      // so we emit the entire read file? - file is the argument here 
      emitter.emit('fileread', file);

      const match = content.match(regex);

      if (match) {
        // so match will either exist as an array of matches, or it will be null or undefined I think - null it is
        // so now we go through all of the matches, and emit found event
        // and we also emit arguments - the while file in this case, and the element
        match.forEach((elem) => emitter.emit('found', file, elem));
      }
    });
  }

  return emitter
}


findRegex([
  "fileA.txt",
  "fileB.json"
], /hello \w+/g 
)
.on("fileread", file => console.log(`${file} was read`))
.on("found", (file, match) => console.log(`Matched "${match}" in ${file} `))
.on("error", err => console.error(`Error emitted: ${err.message}`))