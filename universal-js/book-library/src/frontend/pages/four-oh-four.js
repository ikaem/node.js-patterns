import React from 'react';
import { Link, useRoutes } from 'react-router-dom';
import htm from 'htm';

import Header from '../components/header.js';

export default function FourOhFour({ error = 'Page not found' }) {
  const html = htm.bind(React.createElement);

  const routes = useRoutes();
  // console.log('routes', routes);

  return html`<div>
      <${Header} />
      <div>
        <h2>404</h2>
        <h3>${error}</h3>
        <${Link} to='/'>Go back to the home page</$>
      </div>
    </div>`;
}
