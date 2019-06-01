const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Schema defines shape of the document within the collection
const trainerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  job_type: {
    type: String,
    required: true
  }

  // learners: {
  //   type: Schema.Types.ObjectId,
  //   ref: "learner"
  // }
});

// Create a model of the schema
module.exports = mongoose.model("trainer", trainerSchema);
