// non flowing readable streaming approach - read() method signrature 
// readable.read([size])

process.stdin
// .setEncoding("utf8")
.on("readable", () => {
  console.log("what the fuck")
  let chunk;

  console.log("New data available")

  

  // size is provided if we want to get only speciifc amount of data while working in binary mode 
  while((chunk = process.stdin.read()) !== null) {
    console.log("The chunk has been read - ", chunk.length, "bytes: ", chunk.toString())

    // switchhing encoding?
    // process.stdin.setEncoding("utf16le")
  }
})
// we have an on end listener - this is for eeadalbels i thin k
.on("end", () => console.log("End of stream"))


