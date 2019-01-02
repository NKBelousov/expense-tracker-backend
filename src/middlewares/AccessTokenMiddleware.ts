import { Request, Response, NextFunction, RequestHandler } from "express";
import { Client, QueryResult } from "pg";

const handler: Function = (client: Client): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
  if (req.url === "/auth") {
    next();
  } else {
    const token: String = req.get("Authorization");
    const query = {
      text: 'SELECT * FROM users_tokens WHERE token = $1',
      values: [token],
      name: 'Find user by token',
    };
    client.query(query, (error: Error, response: QueryResult) => {
      if (error || response.rows.length === 0) {
        res.status(400).send({
          message: "invalid_access_token",
        });
      } else {
        next();
      };
    });
  }
};

export default handler;