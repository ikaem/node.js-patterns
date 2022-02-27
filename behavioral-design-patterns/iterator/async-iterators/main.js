import { CheckUrls } from './check-urls.js';

async function main() {
  // arrays have an @@iterator method by default
  const urls = [
    'https://nodejsdesignpatterns.com',
    'https://example.com',
    'https://mustbedownforsurehopefully.com',
  ];

  const checkUrls = new CheckUrls(urls);

  // and now we loop over the check urls
  // we know its itertator is async (the class is an async iterable), so we can loop with for await
  for await (const status of checkUrls) {
    // we will get back the value part by default
    // if we wanted done, we need to use .next() syntax
    console.log('status:', status);
  }
}

main();
