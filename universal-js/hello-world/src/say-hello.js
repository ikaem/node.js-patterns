// import nunjucks from 'nunjucks';

// export function sayHello(name) {
//   // return nunjucks.renderString(template, { name });

//   // if (typeof window !== 'undefined' && window.document)
//   //   return nunjucks.renderString(template, { name });
//   // return `Hello \u001b[1m${name}\u001b[0m`;

//   if (typeof __BROWSER__ !== 'undefined') {
//     const template = '<h1>Hello <i>{{name}}</i><h1>';
//     return nunjucks.renderString(template, { name });
//   }
//   return `Hello \u001b[1m${name}\u001b[0m`;
// }

import chalk from 'chalk';

export function sayHello(name) {
  return `Hello ${chalk.green(name)}`;
}
