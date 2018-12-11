"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const AccessTokenMiddleware_1 = require("./middlewares/AccessTokenMiddleware");
const IndexHandler_1 = require("./handlers/IndexHandler");
const port = 3000;
const app = express()
    .use(AccessTokenMiddleware_1.default);
const createdCallback = () => console.log(`App listening on port ${port}!`);
app
    .get('/', IndexHandler_1.default)
    .listen(port, createdCallback);
//# sourceMappingURL=index.js.map