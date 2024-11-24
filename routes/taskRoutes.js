const express = require("express");
const Task = require("../models/task");
const jwt = require("jsonwebtoken");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware")

router.get("/", verifyToken,async (req, res) => {
  const tasks = await Task.find({ userId: decoded.id });
  res.json(tasks);
});

router.post("/add", verifyToken, async(req, res) => {
  const { userId, title, description, dueDate, status } = req.body
  const task = new Task({ userId, title, description, dueDate, status })
  await task.save()
  res.status(201).json({ message: "Task created" })
})

module.exports = router;
