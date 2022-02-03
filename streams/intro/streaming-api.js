import {createReadStream, createWriteStream} from "fs"
import {createGzip} from "zlib"


const filename = process.argv[2]

// so we start the read stream 
createReadStream(filename)
// then we pipe
// and it sees we have to pipe the result into a destination 
// lets pipe it into a console log 
.pipe(createGzip())
// then we pipe it into a new file it seems
.pipe(createWriteStream(`${filename}.gz`))
// this is just an event listener 
// i guess we listen for which event - what sends this finish event? - the pipe?
.on("finish", () => console.log("File compressed!"))