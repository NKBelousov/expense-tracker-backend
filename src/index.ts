import { Client } from "pg";

import AccessTokenMiddleware from './middlewares/AccessTokenMiddleware';
import AccessControlMiddleware from './middlewares/AccessControlMiddleware';

import IndexHandler from "./handlers/IndexHandler";
import GetPaymentTypesHandlerFactory from "./handlers/GetPaymentTypesHandlerFactory";

async function main() {
  const dotenv = require("dotenv").config();
  const express = require("express");
  const bodyParser = require("body-parser");

  const client: Client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
  });

  await client.connect();

  const port = process.env.PORT;
  const app = express()
    .use(bodyParser.json())
    .use(AccessControlMiddleware)
    .use(AccessTokenMiddleware(client));

  const createdCallback: Function = () => console.log(`App listening on port ${port}!`);

  app
    .get('/', IndexHandler)
    .get('/api/payment/types', GetPaymentTypesHandlerFactory(client))
    .listen(port, createdCallback);
}
main();