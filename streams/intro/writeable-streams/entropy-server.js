import { createServer } from 'http';
import Chance from 'chance';

const chance = new Chance();

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  while (chance.bool({ likelihood: 95 })) {
    // so keep writing
    // here, we write into the writable stream? to be read, saved, or whatnot?
    res.write(`${chance.string()} \n`);
  }

  res.end('\n\n');

  // so this means that I could in theory attach on linster to each res?
  res.on('finish', () => {
    console.log('All data sent');
  });
});

server.listen(8080, () => console.log('Server is listening '));
