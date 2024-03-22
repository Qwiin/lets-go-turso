import express, { Request, Response } from 'express';
import { ResultSet, createClient } from "@libsql/client";

const userRoutes = express.Router();

const getUsers = (req: Request, res: Response) => {
  if (!req) {
    console.error("no request object");
  }

  const client = createClient({
    url: process.env.TURSO_DB_URI || "",
    authToken: process.env.TURSO_DB_TOKEN,
  });

  let query: string = `SELECT * FROM users`;


  const displayName = req.params.dn;
  if (displayName) {
    console.log(`querying for user ${displayName}`);
    query += ` WHERE displayName='${displayName}'`;
  }

  console.log(query);
  // if (displayName) {

  client.execute(query)
    .then((result: ResultSet) => {
      const responseJSON = result.toJSON();
      console.log(responseJSON);
      res.json(responseJSON);
    })
    .catch((reason) => {
      console.error("(!) user query rejected:", reason);
      // return null;
      res.status(500);
      res.send(`server error :: getUser() :: ${reason}`);
    }).finally(() => {
      client.close();
    });
}


userRoutes.route("/user/:dn").get(getUsers);
userRoutes.route("/users").get(getUsers);

export { userRoutes };
