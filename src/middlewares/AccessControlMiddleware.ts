import { RequestHandler, Request, Response, NextFunction } from "express";

const handler: RequestHandler = function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method.toUpperCase() === "OPTIONS") {
    res.status(200).send();
    return;
  }
  next();
};

export default handler;
