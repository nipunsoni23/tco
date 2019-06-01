const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Shape of User document.
const learnerSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
  // subjectTrainer: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "trainer"
  //   }
  // ]
});

// Create model of the user schema
module.exports = mongoose.model("learner", learnerSchema);
