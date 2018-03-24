const express = require('express');
const helmet = require('helmet');
const next = require('next');
const mycrud = require('./lib/mycrud');
const {tinkuy} = require('./lib/tinkuy');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  tinkuy(mycrud);

  const server = express();

  server.use(helmet());
  server.use('/mycrud', mycrud.router);

  server.get('/events/:id', (req, res) => {
    return app.render(req, res, '/event', {id: req.params.id});
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
