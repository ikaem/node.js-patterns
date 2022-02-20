import { createObservable } from './create-observable.js';

function calculateTotal(invoice) {
  return invoice.subtotal - invoice.discount + invoice.tax;
}

const invoice = {
  subtotal: 100,
  discount: 10,
  tax: 20,
};

// now we create the total variable
// this variable will be modified in the observable
// this is pretty cool

let total = calculateTotal(invoice);
console.log('This is starting total', total);

// now we create the proxied invoice objhect
// we will use this object just to
// indirectly modify the origian linvoice
// and we will also pass in the observer function that will tell our state that something has changed
// by somethhing, i mean that the total has changed

const observedInvoice = createObservable(invoice, ({ prop, prev, curr }) => {
  // we will now recalculate total and reassign it here
  // and this will server as a notification to our app that total has changed
  // we still pass it the same invoice variable - but it might have changed by now, because this is called only if we modify the original object
  total = calculateTotal(invoice);
  console.log(`TOTAL: ${total} (${prop} changed: ${prev} -> ${curr})`);
});

observedInvoice.subtotal = 200;
observedInvoice.discount = 20;
observedInvoice.discount = 20;
observedInvoice.tax = 30;

console.log('what is the final total:', total);
