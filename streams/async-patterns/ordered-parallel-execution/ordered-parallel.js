import { pipeline } from 'stream';
import { createWriteStream, createReadStream } from 'fs';

import parallelTransform from 'parallel-transform';
import split from 'split';
import superagent from 'superagent';

pipeline(
  createReadStream(process.argv[2]),
  split(),
  // we need to provide some callback to parallelTranform
  // our callback will check for url, and call done if not
  // oh, ok, this is max concurrency
  parallelTransform(4, async function (url, done) {
    if (!url) return done();

    console.log('url:', url);

    try {
      await superagent.head(url, { timeout: 5 * 1000 });
      this.push(`${url} is up`);
    } catch {
      this.push(`${url} is down`);
    }

    done();
  }),

  createWriteStream('results.txt'),
  (err) => {
    if (err) {
      console.error(err);
      prcess.exit(1);
    }

    console.log("All urls have been checked ")
  }
);
