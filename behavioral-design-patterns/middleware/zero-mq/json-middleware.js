export const jsonMiddleware = function () {
  return {
    inbound(message) {
      // this is because we are receving a buffer actually
      return JSON.parse(message.toString());
    },
    outbound(message) {
      // here we need to create a string buffer
      return Buffer.from(JSON.stringify(message));
    },
  };
};
