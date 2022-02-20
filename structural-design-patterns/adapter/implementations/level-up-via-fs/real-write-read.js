import fs from 'fs';

fs.writeFile('file.txt', 'hello', () => {
  fs.readFile(
    'file.txt',
    {
      encoding: 'utf8',
    },
    (err, res) => {
      if (err) {
        return console.error(err);
      }
      console.log(res);
    }
  );
});

// now we read a missing file
fs.readFile('missing.txt', { encoding: 'utf8' }, (err, res) => {
  console.error(err);
});
