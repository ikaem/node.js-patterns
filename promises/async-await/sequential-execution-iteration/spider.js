import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { dirname } from 'path';
import { promises as fsPromises } from 'fs';

async function download(url, filename) {
  console.log('downloading', url);

  const { text: content } = await superagent.get(url);

  await mkdirp(dirname(filename));
  await fsPromises.writeFile(filename, content);

  console.log('Downloaded and saved:', url);

  return content;
}

async function spiderLinks(currentUrl, content, nesting) {
  if (nesting === 0) {
    return;
  }

  const links = getPageLinks(currentUrl, content);
  for (const link of links) {
    // note await inside for of loop
    await spider(link, nesting - 1);
  }
}

export async function spider(url, nesting) {
  const filename = urlToFilename(url);

  let content;

  try {
    content = await fsPromises.readFile(filename, 'utf-8');
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;

    // otherwise, assign value in the catch
    content = await download(url, filename);
  }

  // here it seems it is ok to actually return a promsie - not resolved promsie
  // because it can be evaluated in the caller - which is by chance, the spiderLinks function itself
  return spiderLinks(url, content, nesting);
}

async function antipatternSpiderLinks(currentUrl, content, nesting) {
  if (nesting === 0) return;

  const links = getPageLinks(currentUrl, content);

  // this part is wrong
  // links.forEach(async function iteration(link) {
  links.map(async function iteration(link) {
    await spider(link, nesting - 1);
  });
}

async function parallelAwaitSpiderLinks(currentUrl, content, nesting) {
  if (nesting === 0) return;

  const links = getPageLinks(currentUrl, content);
  // this will return promise for each item in the links array
  const promises = links.map((link) => spider(link, nesting - 1));
  // and now we must loop over them, and await each prmise to resolve
  // do we not return aynthing? it seems not - promise of undefined wll be returned?
  for (const promise of promises) {
    await promise;
  }
}

async function parallelPromiseAllSpiderLinks(currentUrl, content, nesting) {
  if (nesting === 0) return;

  const links = getPageLinks(currentUrl, content);
  // this will return promise for each item in the links array
  const promises = links.map((link) => spider(link, nesting - 1));

  return Promise.all(promises)

}

