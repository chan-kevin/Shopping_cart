const express = require("express");
const jsonServer = require("json-server");
const bcrypt = require("bcrypt");

const jsonRouter = jsonServer.router("./db/db.json");
const router = express.Router();

const users = [];

router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      username: req.body.username,
      password: hashedPassword,
    };
    users.push(newUser);
    res.send(newUser);
    console.log(users);
    // jsonRouter.db.get("users").push(newUser).write();
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  const user = users.find((user) => user.username === req.body.username);
  if (user === null) return res.status(400).send("Cannot find user");
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("success");
    } else {
      res.send("not allowed");
    }
  } catch (err) {
    res.status(500).send("failed");
  }
});

module.exports = router;
