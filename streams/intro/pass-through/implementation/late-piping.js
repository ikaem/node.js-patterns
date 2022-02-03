import { createReadStream } from 'fs';

// just an example of a function to upload a file to a data storage service
function upload(filename, contentStream) {
  /* ... */
}

upload('some-picture.jpg', createReadStream('path/to/some-picture.jpg'));
