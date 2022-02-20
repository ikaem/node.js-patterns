import jot from 'json-over-tcp-2';

const server = jot.createServer({ port: 5000 });

// now we register event just to be able to see when the soccet gets adata
server.on('connection', (socket) => {
  socket.on('data', (data) => {
    /* we will get data every time we send data now */
    console.log('Client data', data);
  });
});

server.listen(5000, () => console.log('Server has started'));
