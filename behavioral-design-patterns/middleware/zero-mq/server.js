import zeromq from 'zeromq';

import { ZmqMiddlewareManager } from './zmq-middleware-manager.js';
import { jsonMiddleware } from './json-middleware.js';
import { zlibMiddleware } from './zlib-middleware.js';

async function main() {
  // not sure what this does
  const socket = new zeromq.Reply();
  console.log('socket', socket);

  await socket.bind('tcp://127.0.0.1:5000');

  const zmqm = new ZmqMiddlewareManager(socket);
  zmqm.use(zlibMiddleware());
  zmqm.use(jsonMiddleware());
  // here is another inline middleware, just to send data back immeidately when we get a message - this is cool
  // and ofc to return the messag
  zmqm.use({
    async inbound(message) {
      console.log('Received', message);
      if (message.action === 'ping') {
        await this.send({
          action: 'pong',
          echo: message.echo,
        });
      }

      // this is i guess so we can chain stuff - middlewrae should allways return the stuff we act upon
      return message;
    },
  });

  console.log('Server started');
}

main();
