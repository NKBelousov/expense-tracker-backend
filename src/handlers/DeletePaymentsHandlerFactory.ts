import { Client, QueryResult } from "pg";
import { Response, NextFunction, RequestHandler } from "express";
import { IGetUserAuthInfoRequest } from "./../middlewares/AccessTokenMiddleware";

const PostPaymentHandlerFactory: Function = (
  client: Client
): RequestHandler => (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const paymentId = req.params.id;
  const userId = req.user_id;
  const q = "DELETE FROM users_payments WHERE user_id = $1 AND id = $2";
  const values = [userId, paymentId];
  client.query(q, values, (error: Error, response: QueryResult) => {
    if (error) {
      res.status(400).json({
        error,
      });
    }
    if (response.rowCount > 0) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  });
};

export default PostPaymentHandlerFactory;
