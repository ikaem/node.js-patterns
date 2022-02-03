import { createReadStream, createWriteStream } from 'fs';
import { Transform, pipeline } from 'stream';
import { strict as assert } from 'assert';

const streamA = createReadStream('package.json');
const streamB = new Transform({
  transform(chunk, enc, done) {
    this.push(chunk.toString().toUpperCase());
    done();
  },
});

const streamC = createWriteStream('package-uppercase.json');

const pipelineReturn = pipeline(streamA, streamB, streamC, (err) => {
  if (err) console.log('error', err);
});

console.log(assert.strictEqual(streamC, pipelineReturn)); // this should be valid

// this is the alternative
const pipeReturn = streamA.pipe(streamB).pipe(streamC);

console.log(assert.strictEqual(streamC, pipeReturn)); // valid as well
