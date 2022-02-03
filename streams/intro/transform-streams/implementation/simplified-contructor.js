import { Transform } from 'stream';

const searchStr = 'World';
const replaceString = 'Node.js';
let tail = '';

const replaceStream = new Transform({
  defaultEncoding: 'utf-8',
  transform(chunk, encoding, cb) {
    const pieces = (tail + chunk).split(searchStr);
    const lastPiece = pieces[pieces.length - 1];
    const tailLen = searchStr.length - 1;

    tail = lastPiece.slice(-tailLen);
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen);
    this.push(pieces.join(replaceString));
    cb();
  },

  flush(cb) {
    this.push(tail)
  }
});
