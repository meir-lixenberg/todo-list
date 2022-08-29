const express = require("express");
const path = require("path");
const router = express.Router();

const todoRouter = require("./todo");

router.use("/api/todo", todoRouter);

router.get("/", (req, res) => {
  res.send("<h1>welcome to todo-list API</h1><hr />");
});

module.exports = router;
