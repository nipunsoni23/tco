const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Shape of Program document.
const programSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  numberOfSemesters: {
    type: Number,
    required: true
  }
});

// Create model of the program schema
module.exports = mongoose.model("program", programSchema);
