import { fork } from 'child_process';
import { connect } from 'net';

function multiplexChannels(sources, destination) {
  let openChannels = sources.length;

  for (let i = 0; i < sources.length; i++) {
    sources[i]
      .on('readable', function () {
        let chunk;

        while ((chunk = this.read()) !== null) {
          /* 1 + 4 is just for clarity */
          const outBuff = Buffer.alloc(1 + 4 + chunk.length);

          /* this will store the source id into the buffer */
          outBuff.writeUInt8(i, 0);

          // this will stroe the packet lenght into the buffer
          outBuff.writeUInt32BE(chunk.length, 1);

          // and this will copy all chunk data into the buffer, from 5th byte on
          chunk.copy(outBuff, 5);

          // we specifiy where we send the packet - i guess channel id will be extracted on the remote server
          console.log(`Sending packet to channnel: ${i}`);

          // this is probably regular response?
          destination.write(outBuff);
        }
      })

      // now, we are still in the loop
      // we will reduce number of open channels because we are done with this one
      // and we will check if the next open channel is non existend - if so, we will close the connection to the destination - finsih the transmission

      .on('end', () => {
        if (--openChannels === 0) {
          destination.end();
        }
      });
  }
}

const socket = connect(3000, () => {
  // we are now createing a child process to run some separate file
  const child = fork(process.argv[2], process.argv.slice(3), { silent: true });

  // and now we call the multiplexer - it will pass both streams to the destination
  // so we weill be writign to the socket, and end it also when we are done with both streams - channels
  multiplexChannels([child.stdout, child.stderr], socket);
});
