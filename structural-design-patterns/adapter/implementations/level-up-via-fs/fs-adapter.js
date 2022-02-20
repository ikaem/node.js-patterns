import { resolve } from 'path';

export function createFSAdaper(db) {
  return {
    readFile(filename, options, callback) {
      /* ... */

      if (typeof options === 'function') {
        callback = options;
        options = {};
      } else if (typeof options === 'string') {
        options = { encoding: options };
      }

      // now we call that db thing
      // we oass it path, options, and calback
      db.get(
        resolve(filename),
        {
          valueEncoding: options.encoding,
        },
        (err, value) => {
          if (err) {
            if (err.type === 'NotFoundError') {
              // we create a whole new error from the database error, just to match the error returned by fs
              err = new Error(`ENOENT, open "${filename}"`);
              err.code = 'ENOENT';
              err.errno = 34;
              err.path = filename;
            }

            return callback && callback(err);
          }
          callback && callback(null, value);
        }
      );
    },
    writeFile(filename, contents, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      } else if (typeof options === 'string') {
        options = { encoding: options };
      }

      // now we store the data
      db.put(
        resolve(filename),
        contents,
        {
          valueEncoding: options.encoding,
        },
        callback
      );
    },
  };
}
