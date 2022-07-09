const express = require('express')
const app = express()
require('dotenv').config()

const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')

const resolvers = require('./graphql/resolvers')

const sequelize = require('sequelize')
const User = require('./models/User')

const server = new ApolloServer({
  typeDefs: importSchema('./graphql/schema.graphql'),
  resolvers,
  context: {
    User,
    sequelize,
  },
  introspection: true,
  playground: true,
})

server.start().then(() => {
  //server.applyMiddleware({ app });

  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: true,
      credentials: true,
    },
  })

  const port = process.env.PORT || 4000

  app.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  })
})
