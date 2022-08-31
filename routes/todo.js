const express = require("express");
const TodoCtrl = require("../controllers/todo");
const router = express.Router();

router.put("/update", async (req, res) => {
  const { _id, category, text, priority } = req.body;

  const data = await TodoCtrl.update(_id, category, text, priority);

  res.status(data.statusCode || 200).json(data);
});

router.post("/create", async (req, res) => {
  const { category, text, priority } = req.body;
  console.log(req.body);
  const data = await TodoCtrl.create(category, text, priority);

  res.status(data.statusCode || 200).json(data);
});

router.get("/list", async (req, res) => {
  const data = await TodoCtrl.list();

  res.status(data.statusCode || 200).json(data);
});

router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;

  const data = await TodoCtrl.destroy(_id);

  res.status(data.statusCode || 200).json(data);
});

router.get("/", (req, res) => {
  res.send("<h1>todo-list API</h1><h2>/api/todo/</h2><hr/>");
});

module.exports = router;
