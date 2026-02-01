const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
  status: {
    type: String,
    enum: ["APPLIED", "SHORTLISTED", "REJECTED", "SELECTED"],
    default: "APPLIED"
  },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", applicationSchema);
