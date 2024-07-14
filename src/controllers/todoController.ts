import { Request, Response } from "express";
import Todo from "../models/Todo";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ message: typedError.message });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { title, dueDate } = req.body;

  const newTodo = new Todo({
    title,
    completed: false,
    dueDate: dueDate || new Date().toISOString(),
  });

  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ message: typedError.message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed, dueDate } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed, dueDate: dueDate || new Date().toISOString() },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ message: typedError.message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ message: typedError.message });
  }
};
