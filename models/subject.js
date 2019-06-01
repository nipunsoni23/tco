const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Shape of Subject document.
const subjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  mincredits: {
    type: Number,
    required: true
  },
  maxcredits: {
    type: Number,
    required: true
  }
});

// Create model of the Subject schema
module.exports = mongoose.model("subject", subjectSchema);
