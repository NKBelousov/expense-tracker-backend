import { RequestHandler, Request, Response, NextFunction } from "express";

const isValid: Function = (token: String): Boolean => {
  return token === "secret";
};

const handler: RequestHandler = function (req: Request, res: Response, next: NextFunction) {
  const token: String = req.get("Authorization");
  if (isValid(token)) {
    next();
  } else {
    res.status(401).json({
      error: "invalid_access_token",
    });
  }
}

export default handler;