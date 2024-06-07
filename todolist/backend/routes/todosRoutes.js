const express = require("express");
const jsonServer = require("json-server");
const uuid = require("uuid");

const jsonRouter = jsonServer.router("./db/db.json");
const router = express.Router();

router.get("/", (req, res) => {
  const data = jsonRouter.db.getState();
  res.json(data.todos);
});

router.post("/", (req, res) => {
  const newTodo = { id: uuid.v4(), ...req.body };
  jsonRouter.db.get("todos").push(newTodo).write();
  res.json(newTodo);
});

module.exports = router;
