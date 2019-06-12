import { Client, QueryResult } from "pg";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { IGetUserAuthInfoRequest } from "middlewares/AccessTokenMiddleware";

const GetUserByIdHandlerFactory: Function = (
  client: Client
): RequestHandler => (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  if (parseInt(id) !== req.user_id) {
    res.status(403).json({
      error: "forbidden",
    });
    return;
  }
  if (typeof id !== "string") {
    res.status(400).json({
      id: "field is missing",
    });
    return;
  }
  const q = "SELECT * FROM users WHERE id = $1 LIMIT 1";
  client.query(q, [id], (error: Error, response: QueryResult) => {
    if (error) {
      res.status(400).json({
        error,
      });
    }
    if (response.rowCount === 0) {
      res.status(404).json({
        error: "user not found",
      });
    } else {
      const { password, ...data } = response.rows[0];
      res.status(200).json({
        meta: {
          count: response.rowCount,
        },
        data,
      });
    }
  });
};

export default GetUserByIdHandlerFactory;
