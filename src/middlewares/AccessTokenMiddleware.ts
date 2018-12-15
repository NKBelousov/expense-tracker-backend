import { RequestHandler } from "express";

const isValid = (token: String): Boolean => {
  return token === "secret";
};

const handler: RequestHandler = function (req, res, next) {
  const token = req.get("Authorization");
  if (isValid(token)) {
    next();
  } else {
    res.status(401).json({
      error: "invalid_access_token",
    });
  }
}

export default handler;