import { createServer } from 'http';
import httpProxy from 'http-proxy';
import consul from 'consul';
import { create } from 'domain';

const routing = [
  {
    path: '/api',
    service: 'api-service',
    index: 0,
  },
  {
    path: '/',
    service: 'web-service',
    index: 0,
  },
];

const consulClient = consul();
const proxy = httpProxy.createProxyServer();

const server = createServer((req, res) => {
  const route = routing.find((route) => {
    return req.url.startsWith(route.path);
  });

  consulClient.agent.service.list((err, services) => {
    let servers = null;

    console.log({ services });

    if (!err)
      servers = Object.values(services).filter((service) =>
        service.Tags.includes(route.service)
      );
    if (err || !servers.length) {
      res.writeHead(502);
      return res.end('Bad Gateway');
    }

    route.index = (route.index + 1) % servers.length;

    const server = servers[route.index];
    const target = `http://${server.Address}:${server.Port}`;

    // this is pretty cool
    // how we specify it address here
    proxy.web(req, res, { target });
  });
});

server.listen(8080, () => {
  console.log('Load balancer started on port 8080');
});
