export function levelSubscribe(db) {
  db.subscribe = (pattern, listener) => {
    // question here is what is the shape of the value argument
    db.on('put', (key, value) => {
      // so here we get all keys from the pattern - lets say it is an arary of a's
      const keys = Object.keys(pattern);

      // here we check that every value on the pattern will be present in the put data
      // this is single key in the funciton passed to every
      const match = keys.every((k) => {
        // and we return true if pattern property value of key is equal to the value that the val[k] has
        return pattern[k] === val[k];
      });

      // if there is a match that all of patterns properties and its values are present on the value put to the db, we will call the listnere and pass it the key and teh value
      // i guess point is that key passed to the listener originally is just a general key, while value is that object we test against the pattern
      if (match) {
        listener(key, val);
      }
    });
  };

  // and now we return the augmented database
  return db;
}
