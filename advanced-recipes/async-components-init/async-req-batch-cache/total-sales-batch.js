import { totalSales as totalSalesRaw } from './total-sales-demo.js';
const runningRequests = new Map();
export function totalSales(product) {
  if (runningRequests.has(product)) {
    // (1)
    console.log('Batching');
    return runningRequests.get(product);
  }
  const resultPromise = totalSalesRaw(product); // (2)
  runningRequests.set(product, resultPromise);
  resultPromise.finally(() => {
    runningRequests.delete(product);
  });
  return resultPromise;
}
