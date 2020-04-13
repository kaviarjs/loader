<h1 align="center">KAVIAR LOADER</h1>

<p align="center">
  <a href="https://travis-ci.org/kaviarjs/loader">
    <img src="https://api.travis-ci.org/kaviarjs/loader.svg?branch=master" />
  </a>
  <a href="https://coveralls.io/github/kaviarjs/loader?branch=master">
    <img src="https://coveralls.io/repos/github/kaviarjs/loader/badge.svg?branch=master" />
  </a>
</p>

<br />
<br />

This function is for loading your GraphQL API seamlessly from multiple places (folders, files, npm packages, etc) so you can have them merged when you start your server. The basic scenario here is that you would have a startup file which loads all your modules which use a defined `loader`. And after that you import the file which starts the server and uses your `loader` to get the schema.

## Install

```
npm install --save @kaviar/loader
```

## Usage

```js
import { Loader } from "@kaviar/loader";

const loader = new Loader();

loader.load({
  // Can also be array of strings
  typeDefs: `
    type Query {
      sayHello: String
    }
  `,

  // Can also be array of resolvers
  resolvers: {
    Query: {
      sayHello: () => "Hello world!",
    },
  },

  // Can also be array of objects
  schemaDirectives: {
    name: MyDirective,
  },

  // Can be array of functions, we recommend to name your functions:
  contextReducers: async function processNewVariables(context) {
    return {
      ...context,
      newVariable: "newValue",
    };
  },
});
```

## Getting it all together

This would happen when you want to instantiate your server

```js
const {
  typeDefs,
  resolvers,
  schemaDirectives,
  contextReducers,
} = loader.getSchema();
```
