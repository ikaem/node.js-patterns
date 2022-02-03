export class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  runTask(task) {
    return new Promise((resolve, reject) => {
      // so we actally push task into the queue
      // and then later, when task is invoekd
      // we will have it run the actually task
      // which will return a promsie - resolved or rejecte

      this.queue.push(() => {
        return task().then(resolve, reject);
      });

      // what is this for
      // so on the next tick, we actually want to call next? but we want to bind it to the class?
      // but why on the next tick?
      process.nextTick(this.next.bind(this))
    });
  }

  // next here
  next() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();

      // we pass it finally callback to tell what should happen when the thing is settled
      // regardless of the actual result being resolution or rejection
      task().finally(() => {
        // here we mark that this task stopped running
        this.running--;
        this.next();
      });

      // here we mark that the task above is runnin - +1
      this.running++;
    }
  }
}
