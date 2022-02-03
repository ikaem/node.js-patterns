process.stdin
  .on('data', (chunk) => {



    process.stdin.pause()

    console.log('New data available');

    // just an example to manually start the flwoing mode 
    process.stdin.resume()

    console.log(`
    Chunk read (${chunk.length} bytes): ${chunk.toString()}`);
  })
  .on('end', () => console.log('End of stream'));
