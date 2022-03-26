import { totalSales as totalSalesRaw } from './total-sales-demo.js';

const CACHE_TTL = 30 * 1000;
const cache = new Map();

export function totalSales(product) {
  if (cache.has(product)) {
    console.log('Cache hit');
    return cache.get(product);
  }

  // this is if the product is not in the cache
  const resultPromise = totalSalesRaw(product);
  cache.set(product, resultPromise);

  resultPromise
    .then(() => {
      setTimeout(() => {
        cache.delete(product);
      }, CACHE_TTL);
    })
    .catch((err) => {
      cache.delete(product);
      throw err;
    });

  // and we just return the promise to be awaited or handled elsewhere
  return resultPromise;
}
