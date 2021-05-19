const express = require('express')
const next = require('next')
const mongodb = require('./util/mongodb.js')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// MongoDB connection status
let status = 'Connecting...'
let error = false
mongodb.connectToDatabase().then(conn => {
  isConnected = conn.client.isConnected()
  if (conn.client.isConnected()) {
    status = 'Successfully connected to MongoDB on ' + process.env.MONGODB_URI
    error = false
  } else {
    status = 'Failed to connect to MongoDB'
    error = true
  }
}).catch(err => {
  status = 'Failed to connect to MongoDB'
  error = true
})

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    status: String!
    error: Boolean!
  }
`)

// The root provides a resolver function for each API endpoint
var root = {
  status: () => {
    return status;
  },
  error: () => {
    return error;
  },
}

// Configure Express
app.prepare().then(() => {
  const server = express()

  // GraphQL endpoint
  server.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
