import { RequestHandler, Request, Response, NextFunction } from "express";

const handler: RequestHandler = function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}

export default handler;