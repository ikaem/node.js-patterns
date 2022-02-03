import { ReplaceStream } from './replace-stream.js';

const replaceStream = new ReplaceStream('World', 'Node.js');

replaceStream.on('data', (chunk) => {
  console.log('This is chunk in buffer format?:', chunk.toString());
  console.log('////////');
});

replaceStream.write('Hello W');
replaceStream.write('orld!');

replaceStream.end();
