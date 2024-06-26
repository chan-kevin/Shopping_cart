const jsonServer = require("json-server");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { isProduction } = require("./config/keys");

const jsonRouter = jsonServer.router("./db/db.json");
const todosRoutes = require("./routes/todosRoutes");
const authRoutes = require("./routes/authRoutes");
const PORT = 5000;

const app = express();

app.use(bodyParser.json());
app.use("/api", jsonRouter);

if (!isProduction) {
  app.use(cors());
}

app.use("/todos", todosRoutes);
app.use("/users", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
