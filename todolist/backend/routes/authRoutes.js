const express = require("express");
const jsonServer = require("json-server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    // jsonRouter.db.get("users").push(newUser).write();
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === req.body.username);

  if (user === null) return res.status(400).send("Cannot find user");

  try {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const currentUser = { name: username };

      const accessToken = jwt.sign(
        currentUser,
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({ username: username, accessToken: accessToken });
    } else {
      res.send("not allowed");
    }
  } catch (err) {
    res.status(500).send("failed");
  }
});

module.exports = router;
