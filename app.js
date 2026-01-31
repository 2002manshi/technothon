const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

app.use("/jobs", jobRoutes);
app.use("/applications", applicationRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
