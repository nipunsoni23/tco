const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Shape of User document.
const semesterSchema = new Schema({
  
  name:{
      type: String,
      required:true
  },
  subjectsNumber:{
      type:Number,
      required:true
  },
  minCredits:{
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
module.exports = mongoose.model("semester", semesterSchema);