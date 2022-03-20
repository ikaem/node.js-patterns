import React from 'react';
import Header from '../components/header.js';
import htm from 'htm';

import { authors } from '../../data/authors.js';
import { Link } from 'react-router-dom';

export default function AuthorsIndex() {
  const html = htm.bind(React.createElement);

  return html`<div>
    <${Header} />
    <div>
      ${authors.map(
        (a) =>
          html`<div key=${a.id}>
          <p>
            <${Link} to="/author/${a.id}">${a.name}</${Link}>
          </p>
        </div>`
      )}
    </div>
  </div>`;
}
