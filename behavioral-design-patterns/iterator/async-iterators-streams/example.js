import split from 'split2';
import { Readable } from 'stream';

async function main() {
  // const stream = process.stdin;
  const stream = process.stdin.pipe(split());

  // stream.on('data', (chunk) => {
  //   console.log('chunk', chunk);
  // });

  for await (const chunk of stream) {
    console.log('chunk', chunk);
  }
}

main();

// this takes an iterable
// like an array
Readable.from();
