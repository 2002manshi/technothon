const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  resumeLink: String
});

module.exports = mongoose.model("Candidate", candidateSchema);
