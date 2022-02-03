import { randomBytes } from 'crypto';

function delay(milliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date());
    }, milliseconds);
  });
}

console.log(`Delaying...${new Date().getSeconds()}s`);
delay(1000)
  // note that whatever is resolved will be passed to then
  .then((newDate) => console.log(`Done ${newDate.getSeconds()}s`));

// promisifier function
function promisify(callbackBasedApi) {
  return function promisified(...args) {
    return new Promise((resolve, reject) => {
      const newArgs = [
        ...args,
        function (err, result) {
          if (err) {
            // note that we do return
            return reject(err);
          }

          resolve(result);
        },
      ];
      callbackBasedApi(...newArgs);
    });
  };
}

const promisifiedFunction = promisify(function (data, callback) {
  console.log(data);
  callback(null, data);
});

promisifiedFunction('karlo');

const randomBytesP = promisify(randomBytes);

randomBytesP(32)
.then(buffer => {
  console.log("Here are random bytes: ", buffer.toString("hex"))
})
