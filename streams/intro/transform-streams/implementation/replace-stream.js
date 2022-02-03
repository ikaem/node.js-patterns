import { Transform } from 'stream';

export class ReplaceStream extends Transform {
  constructor(searchStr, replaceStr, options) {
    super({ ...options });
    this.searchStr = searchStr;
    this.replaceStr = replaceStr;
    this.tail = '';
  }

  _transform(chunk, encoding, callback) {
    console.log('chunk -> ', chunk.toString());
    const pieces = (this.tail + chunk).split(this.searchStr);

    console.log('pieces ->', pieces);

    const lastPiece = pieces[pieces.length - 1];
    console.log('last piece ->', lastPiece);
    const tailLen = this.searchStr.length - 1;
    this.tail = lastPiece.slice(-tailLen);

    console.log(' this tail -> ', this.tail);

    pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen);

    console.log('new pieces ->', pieces);
    console.log('what is pushed - string ->', pieces.join(this.replaceStr));
    this.push(pieces.join(this.replaceStr));
    callback();
  }

  _flush(callback) {
    this.push(this.tail);
    callback();
  }
}
