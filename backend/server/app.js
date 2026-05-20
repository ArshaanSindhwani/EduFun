const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const loginRouter = require("./3. Routers/LOGIN");
const resultsRouter = require("./3. Routers/RESULTS");
const gameRouter = require("./3. Routers/GAME");

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}

app.get("/", (req, res) => {
  res.send({
    message: "welcome",
    description: "EduFun API",
  });
});

app.use("/login", loginRouter);
app.use("/results", resultsRouter);
app.use("/game", gameRouter);

module.exports = app;
