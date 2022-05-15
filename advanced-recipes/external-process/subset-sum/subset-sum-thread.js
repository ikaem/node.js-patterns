import cluster from 'cluster';
import { EventEmitter } from 'events';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { ThreadPool } from './thread-pool.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workerFile = join(__dirname, 'workers', 'subset-sum-process-thread.js');
const workers = new ThreadPool(workerFile, 2);

export class SubsetSumFork extends EventEmitter {
  constructor(sum, set) {
    super();
    this.sum = sum;
    this.set = set;
  }

  async start() {
    const worker = await workers.acquire();
    // this has already created a worker that has forked
    // i guess that is why we can use send
    // this will start the chil process intantialtion of original subset sum
    worker.postMessage({ sum: this.sum, set: this.set });

    // now we define what to do on message i gues
    const onMessage = (msg) => {
      if (msg.event === 'end') {
        // this assumes that we will have on message listener on the worker, which we do below
        worker.removeListener('message', onMessage);
        workers.release(worker);
      }

      // this is in case there is no end event
      // we emit the event and data agan
      this.emit(msg.event, msg.data);
    };

    // and now we set listener on the worker - we can bc it is a child process
    worker.on('message', onMessage);
  }
}
