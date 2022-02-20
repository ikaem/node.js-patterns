import { JsonConfig } from './implementations/json-config.js';
import { IniConfig } from './implementations/ini-config.js';

async function main() {
  const jsonConfig = new JsonConfig();

  await jsonConfig.load('samples/conf.json');
  jsonConfig.set('nodejs', 'design patterns');
  await jsonConfig.save('samples/conf_mod.json');
}
