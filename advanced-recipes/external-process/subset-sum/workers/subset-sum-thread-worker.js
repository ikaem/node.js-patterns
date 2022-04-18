import { parentPort } from 'worker_threads';
import { SubsetSum } from '../subset-sum';

parentPort.on('message', (msg) => {
  const subsetSum = new SubsetSum(msg.sum, msg.set);

  subsetSum.on('match', (data) => {
    parentPort.postMessage({
      event: 'match',
      data: data,
    });

    // parent prot on does not offer end it seems[], but close instead?
    parentPort.on('end', (data) => {
      parentPort.postMessage({
        event: 'end',
        data: data,
      });
    });

    subsetSum.start();
  });
});
