const jsonServer = require("json-server");
const express = require("express");

const app = express();
const jsonRouter = jsonServer.router("./db/db.json");
const middlewares = jsonServer.defaults();
const PORT = 5000;

app.use("/api", middlewares, jsonRouter);

app.get("/todos", (req, res) => {
  const data = jsonRouter.db.getState();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
