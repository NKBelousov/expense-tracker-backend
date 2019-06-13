import { Client, QueryResult } from "pg";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { IGetUserAuthInfoRequest } from "middlewares/AccessTokenMiddleware";

const GetPaymentByIdHandlerFactory: Function = (
  client: Client
): RequestHandler => (req: IGetUserAuthInfoRequest, res: Response) => {
  const id = req.params.id;
  if (typeof id !== "string") {
    res.status(400).json({
      id: "field is missing",
    });
    return;
  }
  const q =
    "SELECT * FROM users_payments WHERE id = $1 AND user_id = $2 LIMIT 1";
  client.query(q, [id, req.user_id], (error: Error, response: QueryResult) => {
    if (error) {
      res.status(400).json({
        error,
      });
    }
    if (response.rowCount === 0) {
      res.status(404).json({
        error: "payment not found",
      });
    } else {
      res.status(200).json({
        meta: {
          count: response.rowCount,
        },
        data: response.rows[0],
      });
    }
  });
};

export default GetPaymentByIdHandlerFactory;
