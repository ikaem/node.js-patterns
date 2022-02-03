import { Chance } from 'chance';
import { createServer } from 'http';

const chance = new Chance();

const server = createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
  });

  function generateMore() {
    while (chance.bool({ likelikehood: 95 })) {
      const randomChunk = chance.string({
        lenght: 16 * 1024 - 1,
      });

      const shouldContinue = res.write(`${randomChunk}\n`);

      if (!shouldContinue) {
        console.log('back-pressure');
        // and then here i guess we just waint for the event drain to happen, so we can generate again
        return res.once('drain', generateMore);
      }
    }

    // this is still in the function
    res.end(`\n\n`);
  }

  // finally, we cann generate more
  generateMore();
  res.on('finish', () => console.log('All data sent'));
});


server.listen(3000, () => console.log("Server is listening"))