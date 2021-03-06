const MongoClient = require('mongodb').MongoClient

const { MONGODB_URI, MONGODB_DB } = process.env

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(process.env.MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(process.env.MONGODB_DB),
      }
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

module.exports.connectToDatabase = connectToDatabase
