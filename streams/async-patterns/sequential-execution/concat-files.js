import { createWriteStream, createReadStream } from 'fs';
import { Readable, Transform } from 'stream';

export function concatFiles(dest, files) {
  return new Promise((resolve, reject) => {
    // ok, so here we will create a stream that will write to this destination
    const destStream = createWriteStream(dest);

    Readable.from(files)
      .pipe(
        new Transform({
          objectMode: true,
          transform(filename, enc, done) {
            // ok, now we want to read each filename
            const src = createReadStream(filename);
            // and then reach filename we will pipe into a desitnation stream instnqace, which i guess will be jsut adding all files to a signle string?
            src.pipe(destStream, { end: false });
            src.on('error', done);
            // src.on('finish', done);
            src.on('end', done);
          },
        })
      )
      // we just reject the rpomise if there is an error
      .on('error', reject)
      .on('finish', () => {
        // just to make sure that when the readable einstance stops with reading that we sould end the destination stream too
        destStream.end();
        resolve();
      });
  });
}
