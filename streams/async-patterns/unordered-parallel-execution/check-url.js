import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import split from 'split';
import superagent from 'superagent';
import { ParallerStream } from './parallel-stream.js';

pipeline(
  createReadStream(process.argv[2]),
  split(),
  new ParallerStream(async (url, enc, push, done) => {
    if (!url) return done();
    try {
      await superagent.head(url, { timeout: 5 * 1000 });
      push(`${url} is up\n`);
    } catch (err) {
      push(`${url} is down\n`);
    }

    done();
    // so this eams that after we finsih with this transform - which is just pushing some strings in, we move to write stream
  }),
  createWriteStream("results.txt"),
  (err) => {
    if(err) {
      console.error(err)
      process.exit(1)
    }

    console.log("All has been checked - all urls have been pinged, and they are good")
  }
);
