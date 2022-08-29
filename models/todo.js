const mongoose = require("mongoose");

const Todo = new mongoose.Schema(
  {
    category: { type: String, required: true },
    text: { type: String, required: true },
    priority: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", Todo);
