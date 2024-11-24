const express = require("express");
const Task = require("../models/task");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.header("Authorization");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const tasks = await Task.find({ userId: decoded.id });
  res.json(tasks);
});

module.exports = router;
