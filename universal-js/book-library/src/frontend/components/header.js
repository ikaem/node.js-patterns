import React from 'react';
import { Link } from 'react-router-dom';
import htm from 'htm';

export default function Header() {
  const html = htm.bind(React.createElement);

  return html`
    <header>
      <h1>
      <${Link} to='/'>My library</$>
      </h1>
    </header>
    `;
}
