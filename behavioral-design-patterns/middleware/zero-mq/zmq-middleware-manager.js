export class ZmqMiddlewareManager {
  constructor(socket) {
    this.socket = socket;
    this.inboundMiddleware = [];
    this.outboundMiddleware = [];

    // this is called nitially to immediately handle all incoming messages that might be awating in the socket, in the queue
    this.handleIncomingMessages().catch((err) => console.error(err));
  }

  // ok, now define handle incoming messages
  async handleIncomingMessages() {
    // why do we for await?
    // probably because the socket is either a stream, readable
    // or, it implements the @@asyncIterator, so we first need to await that message to be resolved
    for await (const [message] of this.socket) {
      await this.executeMiddleware(this.inboundMiddleware, message).catch(
        (err) => {
          console.error(`Error while processing the message`, err);
        }
      );
    }
  }

  async send(message) {
    const finalMessage = await this.executeMiddleware(
      this.outboundMiddleware,
      message
    );

    // why return
    return this.socket.send(finalMessage);
  }

  use(middleware) {
    if (middleware.inbound) {
      this.inboundMiddleware.push(middleware.inbound);
    }
    if (middleware.outbound) {
      this.outboundMiddleware.unshift(middleware.outbound);
    }
  }

  // now to exectue middleware
  async executeMiddleware(middlewares, initialMessage) {
    // we dont want to mutate the original message

    let message = initialMessage;
    // this is probably becuase we have any async iterable, and it needs to resolve its own middleware function value
    for await (const middlewareFunc of middlewares) {
      // we do bind the call to this context
      message = await middlewareFunc.call(this, message);
    }

    return message;
  }
}
