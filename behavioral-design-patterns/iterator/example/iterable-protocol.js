// this complies with the interface of the iterable protocol
// it needs to implement the @@iterator method
// and i guess this one should return an iterator object

class MyIterable {
  [Symbol.iterator]() {
    // and here we return an iterator, like the one we created in the iterator-protocol.js
  }
}
