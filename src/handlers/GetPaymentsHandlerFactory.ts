import { Client, QueryResult } from "pg";
import { Request, Response, NextFunction, RequestHandler } from "express";

const GetPaymentHandlerFactory: Function = (client: Client): RequestHandler => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const q = "SELECT * FROM users_payments";
  client.query(q, (error: Error, response: QueryResult) => {
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
