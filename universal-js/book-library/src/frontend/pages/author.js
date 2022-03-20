import React from 'react';
import { useParams } from 'react-router-dom';
import htm from 'htm';

import { authors } from '../../data/authors.js';
import Header from '../components/header.js';
import FourOhFour from './four-oh-four.js';

export default function Author() {
  const { authorId } = useParams();
  const author = authors.find((a) => a.id === authorId);

  const html = htm.bind(React.createElement);

  if (!author) return html`<${FourOhFour} error="Author not found" />`;

  return html`<div>
    <${Header} />
    <h2>${author.name}</h2>
    <p>${author.bio}</p>
    <h3>Books</h3>
    <ul>
      ${author.books.map(
        (book) => html`<li key=${book.id}>${book.title} (${book.year})</li>`
      )}
    </ul>
  </div>`;
}
