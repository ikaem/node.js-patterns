import level from 'level';
import sublevel from 'subleveldown';

// we define a db here i guess
const db = level('example-db');

// here we create a colleciton i guess? a sublevel db?
const salesDb = sublevel(db, 'sales', { valueEncoding: 'json' });

// now function to query the db
export async function totalSales(product) {
  const now = Date.now();
  let sum = 0;

  // so create value stream is an async iterable - this is why we for await it
  for await (const transaction of salesDb.createValueStream()) {
    if (!product || transaction.product === product) {
      sum += transaction.amount;
    }
  }

  console.log(`
  totalSales() took:
  ${Date.now() - now}ms
  `);

  return sum;
}
