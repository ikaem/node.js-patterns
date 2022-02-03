import path from 'path';
import { URL } from 'url';
import slug from 'slug';

export function urlToFilename(url) {
  const parsedUrl = new URL(url);
  // so we actually split pathanme into array of strings - but we would not ever have a proper url? or?
  // we could have file:/// - new URL("file:///www.karlo.com")
  const urlPath = parsedUrl.pathname
    .split('/')
    .filter(function (component) {
      return component !== '';
    })
    .map(function (component) {
      return slug(component, { remove: null });
    })
    // and here we again join the whole thing, but now we have slugified parts of the url, because there could have been spaces there?
    .join('/');

  let filename = path.join(parsedUrl.hostname, urlPath);

  // here we check if the extendsion matches htm
  if (!path.extname(filename).match(/htm/)) {
    filename += '.html';
  }

  return filename;
}


export function getPageLinks(currentUrl, body) {
  return Array.from()

}