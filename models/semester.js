const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Shape of Semester document.
const semesterSchema = new Schema({
  number: {
    type: Number,
    required: true,
    unique: true
  },
  minCredits: {
    type: Number,
    required: true
  }
});

// Create model of the Semester schema
module.exports = mongoose.model("semester", semesterSchema);
