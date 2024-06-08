import express from "express";
import mysql from "mysql";

const app = express();
const PORT = 4000;
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "<haufe db>",
});

app.get("/", (request, response) => {
  connection.query("SELECT * FROM users", (error, result) => {
    response.send(result);
  });
});

app.listen(PORT, () => {
  console.log("Listening on 4000");
});
