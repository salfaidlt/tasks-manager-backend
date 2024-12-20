const express = require("express");
const Task = require("../models/task");
const jwt = require("jsonwebtoken");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware")

router.get("/", verifyToken,async (req, res) => {
  const userId = req.userId;
  const tasks = await Task.find({ userId: userId });
  res.status(200).json(tasks);
});

router.get('/add', (req, res) => {
  res.status(200).json({ route: "/api/tasks/add/" })
})

router.post("/add", verifyToken, async(req, res) => {
  const { userId, title, description, dueDate, status } = req.body;
  const task = new Task({ userId, title, description, dueDate, status });
  await task.save();
  res.status(201).json({ message: "Task created" });
});

router.put("/:id", verifyToken, async(req, res) => {
  const { id } = req.params;
  const updates = req.body
  const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
  res.json(updatedTask);
});

router.delete("/:id", verifyToken, async(req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.status(200).json({ message: "task " + id + " deleted" })
});

module.exports = router;
