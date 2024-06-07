const express = require("express");
const jsonServer = require("json-server");
const uuid = require("uuid");

const jsonRouter = jsonServer.router("./db/db.json");
const router = express.Router();

router.get("/", (req, res) => {
  const data = jsonRouter.db.get("todos").value();
  res.json(data);
});

router.post("/", (req, res) => {
  const newTodo = { id: uuid.v4(), ...req.body };
  jsonRouter.db.get("todos").push(newTodo).write();
  res.json(newTodo);
});

router.patch("/:id", (req, res) => {
  const todoId = req.params.id;
  const todo = jsonRouter.db.get("todos").find({ id: todoId }).value();
  todo.content = req.body.content;
  res.json(todo);
});

router.delete("/:id", (req, res) => {
  const todoId = req.params.id;
  console.log(todoId);
  jsonRouter.db.get("todos").remove({ id: todoId }).write();
  res.json({ id: todoId });
});

module.exports = router;
