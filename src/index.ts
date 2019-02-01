import { Application } from "express";
import { Client } from "pg";

import AccessTokenMiddleware from "./middlewares/AccessTokenMiddleware";
import AccessControlMiddleware from "./middlewares/AccessControlMiddleware";

import AuthHandlerFactory from "./handlers/AuthHandlerFactory";
import GetPaymentsHandlerFactory from "./handlers/GetPaymentsHandlerFactory";
import GetPaymentTypesHandlerFactory from "./handlers/GetPaymentTypesHandlerFactory";
import IndexHandler from "./handlers/IndexHandler";
import PostPaymentHandlerFactory from "./handlers/PostPaymentsHandlerFactory";

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

  const port: string = process.env.PORT;
  const app: Application = express()
    .use(bodyParser.json())
    .use(AccessControlMiddleware)
    .use(AccessTokenMiddleware(client));

  const createdCallback: Function = () =>
    console.log(`App listening on port ${port}!`);

  app
    .get("/", IndexHandler)
    .post("/auth", AuthHandlerFactory(client))
    .get("/api/payment/types", GetPaymentTypesHandlerFactory(client))
    .get("/api/payments", GetPaymentsHandlerFactory(client))
    .post("/api/payments", PostPaymentHandlerFactory(client))
    .listen(port, createdCallback);
}
main();
