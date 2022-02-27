import zeromq from 'zeromq';

import { ZmqMiddlewareManager } from './zmq-middleware-manager.js';
import { jsonMiddleware } from './json-middleware.js';
import { zlibMiddleware } from './zlib-middleware.js';

async function main() {
  // note that the server is only request
  // request server can send request and receive responses from reply server - socket
  const socket = new zeromq.Request();
  // this is returns immediately, but connection is made asyncrnously
  // - so in theory, await is not needed
  // but what if we send message before it connects
  await socket.connect('tcp://127.0.0.1:5000');

  const zmqm = new ZmqMiddlewareManager(socket);
  zmqm.use(zlibMiddleware());
  zmqm.use(jsonMiddleware());

  // a bit different thrird middware
  // because this is not a reply socket, only messages we get are echoed back from the reply server - socket
  // so we can log everything
  zmqm.use({
    inbound(message) {
      // we will get a proper message readable, because we used middleware to parse it
      console.log('Echoed back', message);

      return message;
    },
  });

  // fun part now - do ping the server every second
  setInterval(() => {
    zmqm
      .send({
        action: 'ping',
        echo: Date.now(),
      })
      .catch((err) => console.log(err));
  });

  console.log('Client connected');
}

main();
