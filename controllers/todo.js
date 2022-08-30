const Todo = require("../models/todo");

class TodoCtrl {
  static async create(category, text, priority) {
    try {
      const newTodo = await Todo.create({
        category,
        text,
        priority,
      });

      return {
        data: newTodo,
        status: 200,
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
        errorMassage: "Failed to save data",
        status: 500,
        ok: false,
      };
    }
  }

  static async list() {
    try {
      const data = await Todo.find({ deletedAt: null });
      return {
        data,
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        error,
        errorMassage: "Failed to get data",
        status: 500,
        ok: false,
      };
    }
  }

  static async update(_id, category, text, priority) {
    const updatedData = {};

    category ? (updatedData.category = category) : null;
    text ? (updatedData.text = text) : null;
    priority ? (updatedData.priority = priority) : null;

    try {
      const updatedTodo = await Todo.findByIdAndUpdate(_id, updatedData, {
        new: true,
      });

      return {
        data: updatedTodo,
        status: 200,
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
        errorMassage: "Failed to update Todo",
        status: 500,
        ok: false,
      };
    }
  }

  static async destroy(_id) {
    try {
      const deletedTodo = await Todo.findByIdAndUpdate(
        _id,
        {
          deletedAt: new Date(),
        },
        { new: true }
      );

      return {
        data: deletedTodo,
        status: 200,
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
        errorMassage: "Failed to delete Todo",
        status: 500,
        ok: false,
      };
    }
  }
}

module.exports = TodoCtrl;
