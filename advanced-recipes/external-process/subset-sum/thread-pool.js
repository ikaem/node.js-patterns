import { Worker } from 'worker_threads';

export class ThreadPool {
  constructor(file, poolMax) {
    this.file = file;
    this.poolMax = poolMax;
    this.pool = [];
    this.active = [];
    this.waiting = [];
  }

  acquire() {
    const handledProcess = new Promise((resolve, reject) => {
      let worker;

      if (this.pool.length > 0) {
        worker = this.pool.pop();
        this.active.push(worker);
        return resolve(worker);
      }

      if (this.active.length >= this.poolMax) {
        // key here is that we jut push resolve and reject into the watiing list, not the actualy worker
        // this is so later we can reuse the processes when we release
        // question here is that we return the lenght of the list, not any kind of worker
        return this.waiting.push({ resolve, reject });
      }

      // i guess we will intantiate this cass for each process we want to create
      // worker = fork(this.file);
      // worker.once('message', (message) => {
      //   if (message === 'ready') {
      //     this.active.push(worker);
      //     return resolve(worker);
      //   }

      //   // we are shutting down the prcess if the worker is not ready
      //   worker.kill();
      //   reject(new Error('Improper process start'));
      // });

      worker = new Worker(this.file);
      worker.once('online', () => {
        this.active.push(worker);
        resolve(worker);
      });

      worker.once('exit', (code) => {
        console.log(`Worker exited with code ${code}`);
        this.active = this.active.filter((w) => worker !== w);
        this.pool = this.pool.filter((w) => worker !== w);
      });
    });

    return handledProcess;
  }

  release(worker) {
    if (this.waiting.length > 0) {
      // we will rwemove fist item from wating  - this is a process i guess
      const { resolve } = this.waiting.shift();
      // and then we will use it top resolve the worker - which is a file, i guess?
      return resolve(worker);
    }

    // else. we will set active to all workers that are not this worker
    this.active = this.active.filter((w) => worker !== w);

    // and we push the worker into the pool - i guess to acquire it later?
    this.pool.push(worker);
  }
}
