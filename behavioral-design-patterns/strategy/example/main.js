import { Config } from './config.js';
import { jsonStrategy, iniStrategy } from './strategies.js';

/*  */
async function main() {
  const iniConfig = new Config(iniStrategy);
  // load data
  await iniConfig.load('configs/conf.ini');
  iniConfig.set('book.nodejs', 'design patterns');
  await iniConfig.save('configs/conf_mod.ini');

  const jsonConfig = new Config(jsonStrategy);
  // load data
  await jsonConfig.load('configs/conf.json');
  jsonConfig.set('book.nodejs', 'design patterns');
  await jsonConfig.save('configs/conf_mod.json');
}

main();
