import { createServer } from 'http';
// import { totalSales } from './total-sales-demo.js';
// import { totalSales } from './total-sales-batch.js';
import { totalSales } from './total-sales-cache.js';

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  // we needed url to get search params from it
  // this is a neat way
  const product = url.searchParams.get('product');
  console.log(`Processing query: ${url.search}`);

  const sum = await totalSales(product);

  // this sets a single header
  res.setHeader('Content-Type', 'application/json');
  // this writes head as in status. we could optionally provide headers too
  res.writeHead(200);

  // this concludes writing to the writable. one last message is ok to write as an argument to the method. after this, the stream is closed
  res.end(
    JSON.stringify({
      product,
      sum,
    })
  );
}).listen(8000, () => console.log('Server started'));
