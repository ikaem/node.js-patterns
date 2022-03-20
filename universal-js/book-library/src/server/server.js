import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import react from 'react';
import reactServer from 'react-dom/server.js';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import { StaticRouter } from 'react-router-dom/server.js';
import App from '../frontend/app.js';
import htm from 'htm';

const __dirname = fileURLToPath(import.meta.url);
const html = htm.bind(react.createElement);

// this could be adjusted to be reused for the frontend too
const template = ({ content }) => `
<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>My library</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script type="text/javascript" src="/public/main.js"></script>
    </body>
  </html>
`;

// we can also provide options to the logger
// but need to install that pino logger thing
const server = fastify({ logger: true });

// i guess this tells fastify static, where to find the static files
server.register(fastifyStatic, {
  root: resolve(__dirname, '..', 'public'),
  // what is prefidx
  // this will prefix all routes inside this register?
  // i guess here we will have the logic for the app? in public?
  // and this might be done with the webpack thing?
  prefix: '/public',
});

// this is now a catch all
server.get('*', async (req, reply) => {
  const location = req.raw.url;
  console.log('location!!', location);
  const staticContext = {};

  const serverApp = html`
    <${StaticRouter} location=${location}>
      <${App}/>
    </$>
  `;

  const content = reactServer.renderToString(serverApp);
  // and generate regualr html of the react app on the backend
  const responseHtml = template({ content });

  reply.code(200).type('text/html').send(responseHtml);
});

const port = Number.parseInt(process.env.PORT) || 3000;
const address = process.env.ADDRESS || '127.0.0.1';

// why do we need the address
server.listen(port, address, (err) => {
  if (err) {
    console.error('Some error', err);
    process.exit(1);
  }
  console.log('info log');
});
