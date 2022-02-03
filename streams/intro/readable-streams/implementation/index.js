// import { RandomStream } from "./radnom-stream.js";
import { randomStream } from "./radnom-stream.js";

// const randomStream = new RandomStream()

randomStream
.on("data", (chunk) => {
  console.log(`Chunk received (${chunk.length} bytes): ${chunk.toString()}`)
})
.on("end", () => {
  console.log(`Produced ${randomStream.emmitedBytes} bytes of random data`)
} )