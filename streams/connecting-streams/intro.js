/* 

echo Hello World set s/World/Node.js/g

*/

// interface of the pipe() method
readable.pipe(writable, [options]);

// not ending wrtitable when readable ends
readable.pipe(writable, { end: false });
