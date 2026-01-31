const express = require("express");
const Job = require("../models/Job");
const router = express.Router();

router.get("/", async (req, res) => {
  const jobs = await Job.find({ isActive: true });
  res.status(200).json(jobs);
});

module.exports = router;
router.post("/add", async (req, res) => {
  const job = await Job.create({
    title: "Backend Developer",
    description: "Node.js + MongoDB",
    location: "Remote",
    isActive: true
  });
  res.json(job);
});
