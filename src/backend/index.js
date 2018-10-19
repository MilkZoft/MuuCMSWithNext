// Dependencies
import express from 'express';
import next from 'next';
import path from 'path';
import graphQLExpress from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import jwt from 'express-jwt';
import bodyParser from 'body-parser';

// GraphQL
import { typeDefs } from './types/Query';
import { resolvers } from './types/Resolvers';

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

    // Body Parser
    app.use(bodyParser.json());

    // Authentication Middleware
    app.use(jwt({ secret: 'codejobs' }));

    // Schema
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    });

    // Static Public
    app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));
    app.use(express.static(path.join(__dirname, '../../public')));

    // GraphiQL
    app.use('/api', graphQLExpress(req => ({
      schema,
      context: {
        user: req.user
      }
    })));

    // Custom Routes
    app.get('/dashboard/:appName/:action?', (req, res) => {
      const { params: { appName, action } } = req;
      const query = {
        ...req.query,
        appName,
        action
      };

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
