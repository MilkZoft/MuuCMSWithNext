// Dependencies
import express from 'express';
import next from 'next';
import path from 'path';
// import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import { GraphQLServer } from 'graphql-yoga';

// GraphQL
import db from './graphql/data/db';
import Query from './graphql/resolvers/Query';
import Mutation from './graphql/resolvers/Mutation';
import Comment from './graphql/resolvers/Comment';
import Post from './graphql/resolvers/Post';
import User from './graphql/resolvers/User';

const graphQLServer = new GraphQLServer({
  typeDefs: './src/backend/graphql/schema/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Comment,
    Post,
    User
  },
  context: {
    db
  }
});

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
    // app.use(jwt({ secret: 'codejobs' }));

    // Static Public
    app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));
    app.use(express.static(path.join(__dirname, '../../public')));

    // GraphiQL
    app.use('/api', () => {
      graphQLServer.start(() => {
        console.log('The server is up');
      });
    });

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
