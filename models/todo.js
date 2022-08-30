const mongoose = require("mongoose");

const Todo = new mongoose.Schema(
  {
    category: { type: String, required: true },
    text: { type: String, required: true },
    priority: { type: Number, required: true },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", Todo);
