import { FailsafeSocket } from './failsafe-socket.js';

const failsafeSocket = new FailsafeSocket({ port: 5000 });

setInterval(() => {
  // and we just send current memory usage to send data to the socket
  failsafeSocket.send(process.memoryUsage());
}, 1000);
