import { Writable } from 'stream';
import { promises as fs } from 'fs';
import { dirname } from 'path';
import mkdirp from 'mkdirp';

export class ToFileStream extends Writable {
  constructor(options) {
    super({ ...options, objectMode: true });
  }

  _write(chunk, encoding, cb) {
    // this will write to a directory form here - relative to this file it seems 
    mkdirp(dirname(chunk.path))
    .then(() => fs.writeFile(chunk.path, chunk.content))
    .then(() => cb())
    // this will pass error to the cb
    .catch(cb)
  }
}
