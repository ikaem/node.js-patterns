import { createServer } from 'http';

const server = createServer();

server.listen({ fd: 'what' });
