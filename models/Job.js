const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Job", jobSchema);
