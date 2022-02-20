import { promises as fs } from 'fs';
import objectPath from 'object-path';

export class Config {
  constructor(formatStrategy) {
    this.data = {};
    this.formatStrategy = formatStrategy;
  }

  get(configPath) {
    // we just get specific value from the config object
    return objectPath(this.data, configPath);
  }

  set(configPath, value) {
    return objectPath.set(this.data, configPath, value);
  }

  // thisis now whs we are here
  async load(filePath) {
    console.log(`Serializing to ${filePath}`);

    // this is the important part - we use the strategy to get data from a file in a specific format
    await fs.writeFile(filePath, this.formatStrategy.deserialize(this.data));
  }

  async save(filePath) {
    console.log(`Serializing to ${filePath}`);

    await fs.writeFile(filePath, this.formatStrategy.serialize(this.data));
  }
}
