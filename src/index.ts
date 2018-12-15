const express = require("express");

import AccessTokenMiddleware from './middlewares/AccessTokenMiddleware';

import IndexHandler from "./handlers/IndexHandler";

const port = 3000;
const app = express()
  .use(AccessTokenMiddleware);

const createdCallback: Function = () => console.log(`App listening on port ${port}!`);

app
  .get('/', IndexHandler)
  .listen(port, createdCallback);
