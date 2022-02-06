// why use factories
/* function createImage(name) {
  return new Image(name);
}

const image = createImage('photo.jpg');

function createImageOfExtensionType(name) {
  if (name.match(/\.jpe?g$/)) return new ImageJpeg(name);
  if (name.match(/\.gif$/)) return new ImageGif(name);
  if (name.match(/\.png$/)) return new ImagePng(name);
  throw new Error('Unsupported format');
}
 */
// encapsulation with closures
function createPerson(name) {
  // this is private - it cannot be accessed by outside, only indeirectly via the returned person object
  const privateProperties = {};

  // this is returned
  const person = {
    setName(name) {
      if (!name) throw new Error('A person must have a name');

      privateProperties.name = name;
    },
    getName() {
      return privateProperties.name;
    },
  };

  person.setName(name);
  return person;
}

// encxapusaltion with classes and # syntax
class PersonWithHash {
  #name;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}

const person = new PersonWithHash('karlo');
console.log(person.name);
