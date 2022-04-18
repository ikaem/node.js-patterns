import { createServer } from 'http';
import { SubsetSum } from './subset.js';
import { SubsetSumDefer } from './subset-defer.js';

createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  // note here that we check the route with the path name - there is no routes as in with the express
  console.log({ req });

  if (url.pathname !== '/subsetSum') {
    res.writeHead(200);
    return res.end("I'm alive");
  }

  const data = JSON.parse(url.searchParams.get('data'));
  const sum = JSON.parse(url.searchParams.get('sum'));

  // we start here with preparing the repsonse
  res.writeHead(200);

  // this is an event emitter instance here
  // const subsetSum = new SubsetSum(sum, data);
  const subsetSum = new SubsetSumDefer(sum, data);

  // now we define what happens on each match
  subsetSum.on('match', (match) => {
    // match variable here is a chunk
    res.write(`Match: ${JSON.stringify(match)}`);
  });

  subsetSum.on('end', () => res.end());

  // and now we only start the thing
  subsetSum.start();
}).listen(8000, () => console.log('Server has started'));
