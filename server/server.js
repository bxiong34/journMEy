const express = require('express');
const app = express();
const cors = require('cors');
const { authMiddleware } = require('../server/utils/auth')

require('dotenv').config();

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// apollo set up
const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

    // Enable All CORS Requests
app.use(cors());
  
  // middleware to handle graphql requests
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

   // if in production, make client/dist files available for download or view in app
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
  } 

  // set up event listener for PORT
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}! 🌍 `);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql 🌍 `);
    });
  });

startApolloServer();
