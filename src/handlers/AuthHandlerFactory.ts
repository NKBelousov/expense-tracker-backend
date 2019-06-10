import { RequestHandler, Request, Response } from "express";
import { Client, QueryResult } from "pg";

import generateToken from "../utils/generateToken";

const AuthHandlerFactory: Function = (client: Client): RequestHandler => (
  req: Request,
  res: Response
) => {
  const { login, password } = req.body;
  const query = {
    text: "SELECT * FROM users WHERE name = $1 AND password = $2;",
    values: [login, password],
    name: "Find user with password",
  };
  client.query(query, (error: Error, response: QueryResult) => {
    if (error) {
      res.status(400).json({
        error,
      });
    } else if (response.rows.length === 0) {
      res.status(400).json({
        message: "user_not_found",
      });
    } else {
      const user = response.rows[0];
      const deleteTokens = "DELETE FROM users_tokens WHERE user_id = $1";
      const token = generateToken();
      client
        .query(deleteTokens, [user.id])
        .then(() => {
          return client.query(
            "INSERT INTO users_tokens (user_id, token) VALUES ($1, $2)",
            [user.id, token]
          );
        })
        .then(() => {
          res.status(200).json({
            token,
          });
        });
    }
  });
};

export default AuthHandlerFactory;
