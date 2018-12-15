import { RequestHandler } from "express";

const IndexHandler: RequestHandler = (req, res) => {
  res.json({
    message: `Hello, Express`,
  });
};

export default IndexHandler;