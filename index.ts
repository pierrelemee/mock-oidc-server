import express, { Request, Response } from "express";
import * as process from "node:process";

const app = express();

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

const PORT = parseInt(process.env.PORT, 10) || 9998
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});