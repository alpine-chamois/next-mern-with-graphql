# Next.js MERN stack example with GraphQL

This code is based on the Next.js [with Redux](https://github.com/vercel/next.js/tree/master/examples/with-redux), [with Express](https://github.com/vercel/next.js/tree/master/examples/custom-server-express), and [with MongoDB](https://github.com/vercel/next.js/tree/master/examples/with-mongodb) examples. The Express server also has the [GraphQL middleware](https://graphql.org/graphql-js/running-an-express-graphql-server/) installed.

## How to use

```bash
git clone https://github.com/alpine-chamois/next-mern-with-graphql
cd next-mern-with-graphql
npm run build
npm start
```

The app will be available at [localhost:3000](http://localhost:3000). Start MongoDB on [localhost:27017](http://localhost:27017) while the status is *Connecting...* to see a successful connection.

```bash
mongod
```

The status can also be accessed through GraphiQL at [localhost:3000/graphql](http://localhost:3000/graphql).

```bash
{
  status,
  error
}
```
