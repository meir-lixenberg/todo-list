const express = require("express");

const router = express.Router();

const TodoCtrl = require("../controllers/todo");

router.get("/list", async (req, res) => {
  const data = await TodoCtrl.list();

  res.status(data.statusCode || 200).json(data);
});

router.get("/", (req, res) => {
  res.send("<h1>todo-list API</h1><h2>/api/todo/</h2><hr/>");
});

module.exports = router;
