const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Shape of User document.
const adminSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name:{
      type: String,
      required:true
  }
  
});

// Create model of the user schema
module.exports = mongoose.model("admin", adminSchema);