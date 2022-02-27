import { inflateRaw, deflateRaw } from 'zlib';
import { promisify } from 'util';

const inflateRawAsync = promisify(inflateRaw);
const deflateRawAsync = promisify(deflateRaw);

export const zlibMiddleware = function () {
  return {
    inbound(message) {
      // this is because we need to pass buffer to the json middleware, so we need to unzim a buffer? or is it? or is it because deflate raw sync will make this a buffer
      return inflateRawAsync(Buffer.from(message));
    },
    outbound(message) {
      // not sure if this comes before or after buffered data by the json middleware
      return deflateRawAsync(message);
    },
  };
};
