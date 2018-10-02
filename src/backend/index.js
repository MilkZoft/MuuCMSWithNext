// Dependencies
import express from 'express';
import next from 'next';
import path from 'path';
import { parse } from 'url';

// Environment
const dev = process.env.NODE_ENV !== 'production';

// Next App
const nextApp = next({
  dev,
  dir: path.resolve(`${__dirname}/../frontend`)
});

// Next Handle
const nextHandle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    // Express App
    const app = express();

    // Static Public
    app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));
    app.use(express.static(path.join(__dirname, '../../public')));

    // Custom Routes
    app.get('/dashboard/:appName/:action?', (req, res) => {
      const { params: { appName, action } } = req;
      const query = {
        ...req.query,
        appName,
        action
      };
      console.log(req.params);
      nextApp.render(req, res, '/dashboard', query);
    });

    // Sending traffic to Next
    app.get('*', (req, res) => nextHandle(req, res));

    app.listen(3000, err => {
      if (err) {
        throw err;
      }

      // eslint-disable-next-line no-console
      console.log('Running server on http://localhost:3000');
    });
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    process.exit(1);
  });
