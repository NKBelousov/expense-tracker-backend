import AccessTokenMiddleware from './middlewares/AccessTokenMiddleware';

import IndexHandler from "./handlers/IndexHandler";

async function main() {

  const { Client } = require('pg');
  const dotenv = require("dotenv").config();
  const express = require("express");

  const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  await client.connect();

  const port = process.env.PORT;
  const app = express()
    .use(AccessTokenMiddleware);

  const createdCallback: Function = () => console.log(`App listening on port ${port}!`);

  app
    .get('/', IndexHandler)
    .listen(port, createdCallback);
}
main();