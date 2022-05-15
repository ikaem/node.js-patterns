import { createServer } from 'http';
import { cpus } from 'os';
import { once } from 'events';
import cluster from 'cluster';

if (cluster.isPrimary) {
  const availableCpus = cpus();
  console.log(`Clustering to ${availableCpus} processes`);
  availableCpus.forEach(() => cluster.fork());

  const workers = cluster.workers;
  // console.log('workers:', workers);

  Object.values(cluster.workers).forEach((worker) => {
    // here we get a worker that we can send data to from the master
    // worker.send('Hello worker', worker.id, 'this is the master');
    console.log('worker id', worker.id);
    worker.send(`Hello worker, ${worker.id} this is the master`);
    // console.log({ worker });
  });

  cluster.on('exit', (worker, code) => {
    if (code === 0) return;
    if (worker.exitedAfterDisconnect) return;

    console.log(`Worker ${worker.process.pid} crashed`);
    console.log(`Starting a new worker`);

    // we jsut create another fork - fork() always forks one additional process
    cluster.fork();
  });

  // note that we listen on the process for the event
  // process.on('SIGUSR2', async () => {
  process.on('exit', async () => {
    console.log('what is sigustr');
    const workers = Object.values(cluster.workers);

    for (const worker of workers) {
      console.log(`Stopping worker: ${worker.process.id}`);
      worker.disconnect();

      await once(worker, 'exit');

      // this would mean that the reason why the worker has existed is not the above .disconnect() method
      if (!worker.exitedAfterDisconnect) continue;

      const newWorker = cluster.fork();
      await once(newWorker, 'listening');
    }
  });
} else {
  const { pid } = process;

  const server = createServer((req, res) => {
    let i = 1e7;
    while (i > 0) {
      i--;
    }

    console.log('Handling request from', pid);
    res.end(`Hello from pid: ${pid}\n`);
  });

  server.listen(8080, () => console.log(`Started at ${pid}`));

  // this is simulating crashing the server
  // setTimeout(() => {
  //   throw new Error('Error crashing a clustered server');
  // }, Math.ceil(Math.random() * 3) * 1000);
}

// // pattern of the cluster module
// if (cluster.isPrimary) {
//   // fork()
// } else {
//   // do work in forked worker
// }
