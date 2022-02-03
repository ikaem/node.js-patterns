import path from 'path';
import { URL } from 'url';
import slug from 'slug';
import cheerio from 'cheerio';

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
  // i guess hoc will return some kind of list with a elements in the body
  return (
    Array.from(cheerio.load(body)('a'))
      .map(function (element) {
        return getLinkUrl(currentUrl, element);
      })
      // this will return all elements that have a valid boolean i guess
      .filter(Boolean)
  );
}


function getLinkUrl(currentUrl, element) {
  // so the current url is actuall a base
  const parsedLink = new URL(element.attribs.href || "", currentUrl)
  const currentParsedUrl = new URL(parsedLink)

  if(parsedLink.hostname !== currentParsedUrl.hostname || !parsedLink.pathname) return null

  return parsedLink.toString()
}