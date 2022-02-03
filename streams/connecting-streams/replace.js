import { ReplaceStream } from './replace-stream.js';

process.stdin
  .on('error', (e) => console.log('error in stream 1'))
  .pipe(new ReplaceStream(process.argv[2], process.argv[3]))
  .on('error', (e) => console.log('error in stream 2'))
  .pipe(process.stdout)
  .on('error', (e) => console.log('error in stream 3'));

// a bit better error handling
// just to cleanup everything
function handleError(err) {
  console.error(err);
  stream1.destroy();
  stream2.destroy();
}

stream1.on('error', handleError).pipe(stream2).on('error', handleError);
