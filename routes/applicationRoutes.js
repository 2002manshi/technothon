const express = require("express");
const Candidate = require("../models/Candidate");
const Application = require("../models/Application");

const router = express.Router();

/**
 * 5.2 APPLY FOR A JOB
 */
router.post("/apply", async (req, res) => {
  const { name, email, resumeLink, jobId } = req.body;

  if (!name || !email || !resumeLink || !jobId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  let candidate = await Candidate.findOne({ email });
  if (!candidate) {
    candidate = await Candidate.create({ name, email, resumeLink });
  }

  const existingApplication = await Application.findOne({
    jobId,
    candidateId: candidate._id
  });

  if (existingApplication) {
    return res.status(409).json({ message: "Already applied for this job" });
  }

  const application = await Application.create({
    jobId,
    candidateId: candidate._id
  });

  res.status(201).json(application);
});

/**
 * 5.3 FETCH APPLICATION STATUS
 */
router.get("/:id", async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  res.status(200).json(application);
});

/**
 * 5.4 UPDATE APPLICATION STATUS
 */
router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;

  const application = await Application.findById(req.params.id);
  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  const validTransitions = {
    APPLIED: ["SHORTLISTED", "REJECTED"],
    SHORTLISTED: ["SELECTED", "REJECTED"]
  };

  if (!validTransitions[application.status]?.includes(status)) {
    return res.status(400).json({
      message: `Invalid status transition from ${application.status} to ${status}`
    });
  }

  application.status = status;
  await application.save();

  res.status(200).json(application);
});

module.exports = router;
