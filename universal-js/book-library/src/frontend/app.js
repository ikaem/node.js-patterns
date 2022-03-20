import React from 'react';
import { Routes, Route } from 'react-router-dom';
import htm from 'htm';
import Author from './pages/author.js';
import AuthorsIndex from './pages/authors-index.js';
import FourOhFour from './pages/four-oh-four.js';
import Header from './components/header.js';

export default function App() {
  const html = htm.bind(React.createElement);

  return html`
    <${Routes}>
      <${Route} path='/' element=${html`<${AuthorsIndex} />`} />
      <${Route} path='/author/:authorId' element=${html`<${Author} />`} />
      <${Route} path='*' element=${html`<${FourOhFour} />`} />
    </${Routes}>
    `;
}
