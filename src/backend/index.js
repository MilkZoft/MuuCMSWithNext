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

    // Body Parser
    graphQLServer.use(bodyParser.json());

    // Authentication Middleware
    // app.use(jwt({ secret: 'codejobs' }));

    // Static Public
    graphQLServer.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));
    graphQLServer.use(express.static(path.join(__dirname, '../../public')));

    // Custom Routes
    graphQLServer.use('/dashboard/:appName/:action?', (req, res) => {
      const { params: { appName, action } } = req;
      const query = {
        ...req.query,
        appName,
        action
      };

      nextApp.render(req, res, '/dashboard', query);
    });

    graphQLServer.use((req, res, next) => {
      if (req.path.startsWith('/graphql')) {
        return next();
      }

      return nextHandle(req, res, next);
    });

    graphQLServer
      .start({
        endpoint: '/graphql',
        playground: '/graphql',
        port: 3000
      })
      .then(() => {
        console.log('Next.js app is running on http://localhost:3000'); // eslint-disable-line no-console
        console.log('GraphQL API is running on http://localhost:3000/graphql'); // eslint-disable-line no-console
      })
      .catch(err => {
        console.error('Server start failed', err); // eslint-disable-line no-console
        process.exit(1);
      });
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    process.exit(1);
  });
