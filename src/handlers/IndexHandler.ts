import { RequestHandler, Request, Response } from "express";

const IndexHandler: RequestHandler = (req: Request, res: Response) => {
  res.json({
    message: `Hello, Express`,
  });
};

export default IndexHandler;