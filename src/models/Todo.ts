import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate: { type: String, default: new Date().toISOString() },
});

const Todo = model("Todo", todoSchema);

export default Todo;
