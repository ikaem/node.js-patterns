import { UrlBuilder } from './url-builder.js';

const url = new UrlBuilder()
  .setProtocol('https')
  .setAuthentication('user', 'pass')
  .setHostname('example.com')
  .build();

console.log('this is url', url.toString());
// this is url https://user:pass@example.com
