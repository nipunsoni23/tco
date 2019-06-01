const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Shape of User document.
const programSchema = new Schema({
  
  name:{
      type: String,
      required:true
  },
  semesterNumber:{
      type:Number,
      required:true
  }
//   subjectTrainer: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "trainer"
//     }
 // ]
});

// Create model of the user schema
module.exports = mongoose.model("program", programSchema);