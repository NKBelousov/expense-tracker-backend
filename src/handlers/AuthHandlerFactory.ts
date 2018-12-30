import { RequestHandler, Request, Response } from "express";
import { Client, QueryResult } from "pg";

const AuthHandlerFactory: Function = (client: Client): RequestHandler => (req: Request, res: Response) => {
  const { name, password } = req.body;
  const query = {
    text: 'SELECT * FROM users WHERE name = $1 AND password = $2;',
    values: [name, password],
    name: 'Find user with password',
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
      res.status(201).json({
        user: {
          id: user.id,
          name: user.name,
        }
      });
    };
  });
};

export default AuthHandlerFactory;