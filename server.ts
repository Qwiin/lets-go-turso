import 'dotenv/config';
import cors from "cors";

import express, { Request, Response } from "express";
import { userRoutes } from './routes/users';

const app = express();

const port = process.env.PORT || 3001;


/*****************************************/
//
// Configuration
//
/*****************************************/

// Cross Origin Resource Sharing
app.use(cors());

// this is the folder served in the production build
app.use(express.static('public'));

// parses url encoded bodies sent via web forms
app.use(express.urlencoded({ extended: true }));

// parses json sent via API clients
app.use(express.json());

app.use(userRoutes);

/*****************************************/
//
// Routes
//
/*****************************************/

// define a route handler for the default home page
app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
