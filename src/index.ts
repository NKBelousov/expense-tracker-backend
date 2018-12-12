const express = require('express');

const AccessTokenMiddleware = require('./middlewares/AccessTokenMiddleware');

const port = 3000;
const app = express()
  .use(AccessTokenMiddleware);

app.get('/', (req, res) => {
  res.json({
    message: `Hello, Express`,
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
