import { createReadStream, createWriteStream } from 'fs';
import split from 'split';

const dest = process.argv[2];
const sources = process.argv.slice(3);

const destStream = createWriteStream(dest);

// we will use this vcariable to check if the next iteration is equal to the lenght of sources, very nice
let endCount = 0;

for (const source of sources) {
  const sourceStream = createReadStream(source, { highWaterMark: 16 });

  sourceStream.on('end', () => {
    if (++endCount === sources.length) {
      // now we set the listener to actually close the destination stream
      destStream.end();
      console.log(`${dest} created`);
    }
  });

  // we are still in the loop
  // i think by default, split will split by \n - and i guess here we want to return both the line and the line braeeajk
  sourceStream
    .pipe(split((line) => line + '\n'))
    .pipe(destStream, { end: false });
}
