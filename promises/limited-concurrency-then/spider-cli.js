import { spider } from './spider';

spider(url, nesting)
  .then(() => console.log('Download done '))
  .catch((err) => console.error(err));
