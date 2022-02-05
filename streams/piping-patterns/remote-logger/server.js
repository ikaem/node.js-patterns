import { createWriteStream } from 'fs';
import { createServer } from 'net';

// so i guess we will have just one source of data now - the requst? or the actual server that recevies data, so yeah, the server...
function demultiplexChannel(source, destinations) {
  let currentChannel = null;
  let currentLength = null;

  source
    .on('readable', () => {
      let chunk;

      if (currentChannel === null) {
        // we want to define the current chunk to get the channel
        // so here we read jsut one byte - i guess it stores the current channel id
        chunk = source.read(1);
        // console.log('chunk in first if', chunk.toString('hex'));
        // chunk in first if 00

        // and now, we just want to read the 0th byte fro mthe channel
        currentChannel = chunk && chunk.readUInt8(0);
        // console.log('current channel', currentChannel);
        // 0 -for the first one

        // console.log('this is chunk at 1', chunk.readUInt8(1));
        // this does not exist - it is because we got only the first byte in the chunk - and we can only read the first byte - we just convert it to a number with readUint 0
      }

      if (currentLength === null) {
        // so here we read first 4 bytes fro mthe internal buffer
        chunk = source.read(4);
        console.log('chunk in second current lenght', chunk.toString('hex'));
        // chunk in second current lenght 00000005

        // and now we want to get the lenght of the chunk - the packet
        // amd this will get al ldata starting from byte 0
        currentLength = chunk && chunk.readUInt32BE(0);
        // and we want to read everything from this starting at the offset of 0
        // console.log('current lenght here', currentLength);

        /* 
        current lenght here 5
        current lenght here 21
        current lenght here 10
        
        */

        if (currentLength === null) {
          return null;
        }
      }

      // so now we want to read as much data from the source as the current packet is of length
      chunk = source.read(currentLength);
      console.log('this is final chiunk read', chunk.toString('utf-8'));
      // this is final chiunk read error1

      if (chunk === null) return null;

      // and now we save stuff in separate files
      console.log(`Received packet from: ${currentChannel}`);

      // so i guess we migh have some function for this - it cannot be just create write stream - sytnax is incorrect
      destinations[currentChannel].write(chunk);

      currentChannel = null;
      currentLength = null;
    })
    .on('end', () => {
      destinations.forEach((destination) => destination.end());
      // we notify that the source channel has closed
      console.log('Source channel closed');
    });
}

// write the server heere
const server = createServer((socket) => {
  // console.log('socket:', socket);

  const stdoutStream = createWriteStream('stdout.log');
  const stderrStream = createWriteStream('stderr.log');

  // and now we just pass all of it to the demultiplexer
  demultiplexChannel(socket, [stdoutStream, stderrStream]);
});

server.listen(3000, () => {
  console.log('server started');
});
