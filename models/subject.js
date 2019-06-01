const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Shape of User document.
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

  //   subjectTrainer: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "trainer"
  //     }
  // ]
});

// Create model of the user schema
module.exports = mongoose.model("subject", subjectSchema);
