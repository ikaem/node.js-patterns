const myModule = (() => {
  const privateFoo = () => {};
  const privateBar = [];

  const exported = {
    publicFoo: () => {},
    publicBar: () => {},
  };

  return exported;
})();

myModule.exported // this is good 
console.log(myModule.privateBar )// undefined 
console.log(myModule.privateFoo) // undefined
