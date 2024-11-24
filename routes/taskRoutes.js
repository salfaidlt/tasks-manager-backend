const express = require("express");
const Task = require("../models/task");
const jwt = require("jsonwebtoken");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware")

router.get("/", verifyToken,async (req, res) => {
  // const tasks = await Task.find({ userId: decoded.id });
  // res.json(tasks);
  res.send("authenticated")
});

module.exports = router;
