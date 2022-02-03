async function main() {
  // important is that stdin is an async iterator - the readable stream
  for await (const chunk of process.stdin) {
    console.log('New data available');
    console.log(`
    Chunk read (${chunk.length} bytes): ${chunk.toString()}`);
  }
}

main()