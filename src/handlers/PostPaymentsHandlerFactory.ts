import { Client, QueryResult } from "pg";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { IGetUserAuthInfoRequest } from "./../middlewares/AccessTokenMiddleware";

const PostPaymentHandlerFactory: Function = (
  client: Client
): RequestHandler => (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { type_id, cost, name } = req.body;
  const id = req.user_id;
  console.log(req.user_id);
  const q =
    "INSERT INTO users_payments (name, cost, type_id, user_id) VALUES ($1, $2, $3, $4)";
  const values = [name, cost, type_id, id];
  client.query(q, values, (error: Error, response: QueryResult) => {
    if (error) {
      res.status(400).json({
        error,
      });
    }
    res.status(200).end();
  });
};

export default PostPaymentHandlerFactory;
