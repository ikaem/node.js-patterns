// note how path has extname function too
import { join, extname } from 'path';
import { URL } from 'url';
import slug from 'slug';
import cheerio from 'cheerio';

function getLinkUrl(currentUrl, element) {
  // so we need to pass an actual element
  const parsedLink = new URL(element.attribs.href || '', currentUrl);
  const currentParsedUrl = new URL(currentUrl);

  // so if these two links dont have a same hostname, or if parsed link has no hostname, return null?
  if (
    parsedLink.hostname !== currentParsedUrl.hostname ||
    !parsedLink.pathname
  ) {
    return null;
  }

  return parsedLink.toString();
}

export function urlToFilename(url) {
  const parsedUrl = new URL(url);
  const urlPath = parsedUrl.pathname
    .split('/')
    .filter(function (component) {
      return component !== '';
    })
    .map(function (component) {
      return slug(component, { remove: null });
    });

  let filename = join(parsedUrl.hostname, urlPath);
  if (!extname(filename).match(/htm/)) {
    filename += '.html';
  }

  return filename;
}

export function getPageLinks(currentUrl, body) {
  return Array.from(cheerio.load(body)('a'))
    .map(function (element) {
      return getLinkUrl(currentUrl, element);
    })
    .filter(Boolean);
}