import { Transform } from 'stream';

export class FilterByCountry extends Transform {
  constructor(country, options = {}) {
    // this is because we might pass in other fields
    options.objectMode = true;
    super(options);
    this.country = country;
  }

  _transform(record, enc, cb) {
    if (record.country === this.country) {
      this.push(record);
    }

    cb();
  }
}
