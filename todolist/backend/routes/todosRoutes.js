const express = require("express");
const jsonServer = require("json-server");
const uuid = require("uuid");

const jsonRouter = jsonServer.router("./db/db.json");
const router = express.Router();

let todolist = [
  {
    id: "1a54ca4a-c1d3-4d68-9d55-deb2fe47eccf",
    content: "test",
  },
  {
    id: "e5cc7ec0-90ec-416e-a97a-b3be271085b6",
    content: "test1",
  },
];

router.get("/", (req, res) => {
  //   const data = jsonRouter.db.get("todos").value();
  res.json(todolist);
});

router.post("/", (req, res) => {
  const newTodo = { id: uuid.v4(), ...req.body };
  //   jsonRouter.db.get("todos").push(newTodo).write();
  todolist.push(newTodo);
  res.json(newTodo);
});

router.patch("/:id", (req, res) => {
  const todoId = req.params.id;
  //   const todo = jsonRouter.db.get("todos").find({ id: todoId }).value();
  const todo = todolist.find((todo) => todo.id === todoId);
  todo.content = req.body.content;
  res.json(todo);
});

router.delete("/:id", (req, res) => {
  const todoId = req.params.id;
  //   jsonRouter.db.get("todos").remove({ id: todoId }).write();
  todolist = todolist.filter((todo) => todo.id !== todoId);
  res.json({ id: todoId });
});

module.exports = router;
