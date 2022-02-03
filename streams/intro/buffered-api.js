import { promises as fs } from 'fs';
import { gzip } from 'zlib';
import { promisify } from 'util';

const filename = process.argv[2]

const gzipPromise = promisify(gzip);


async function main() {
  const data = await fs.readFile(filename)
  const gzippedData = await gzipPromise(data)

  await fs.writeFile(`${filename}.gz`, gzippedData)

  console.log("done")
}

main()