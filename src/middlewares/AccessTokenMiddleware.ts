import { Request, Response, NextFunction, RequestHandler } from "express";
import { Client, QueryResult } from "pg";

export interface IGetUserAuthInfoRequest extends Request {
  user_id: number;
}

const handler: Function = (client: Client): RequestHandler => (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.url === "/auth") {
    next();
  } else {
    const token: String = req.get("Authorization");
    const query = {
      text: "SELECT * FROM users_tokens WHERE token = $1",
      values: [token],
      name: "Find user by token",
    };
    client.query(query, (error: Error, response: QueryResult) => {
      if (error || response.rows.length === 0) {
        res.status(400).send({
          message: "invalid_access_token",
        });
      } else {
        const { user_id } = response.rows[0];
        req.user_id = user_id;
        next();
      }
    });
  }
};

export default handler;
