import { Client, QueryResult } from "pg";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { IGetUserAuthInfoRequest } from "middlewares/AccessTokenMiddleware";

const GetPaymentHandlerFactory: Function = (client: Client): RequestHandler => (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  const q = "SELECT * FROM users_payments WHERE user_id = $1";
  client.query(q, [req.user_id], (error: Error, response: QueryResult) => {
    if (error) {
      res.status(400).json({
        error,
      });
    }
    res.status(200).json({
      meta: {
        count: response.rowCount,
      },
      data: response.rows,
    });
  });
};

export default GetPaymentHandlerFactory;
