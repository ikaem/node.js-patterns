import axios from 'axios';

export function upload(filename, contentStream) {
  return axios.post('http:localhost:3000', contentStream, {
    headers: {
      // note that here we specifiy that our data is a stream actually
      'Content-Type': 'application/octet-stream',
      'X-Filename': filename,
    },
  });
}

// alterantive - upload retruns a writable stream

function createUploadStream(filename) {
  const connector = new PassThrough();

  axios.post('http:localhost:3000', connector, {
    headers: {
      // note that here we specifiy that our data is a stream actually
      'Content-Type': 'application/octet-stream',
      'X-Filename': filename,
    },
  });

  return connector;
}


const upload = createUploadStream("some-file.txt")
upload.write("Hello world")
upload.end()