const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use("/", (req, res) => {
  res.send("home");
});

mongoose
  .connect(
    `mongodb+srv://ashish:eb5CT2mv7vz1h7Ph@cluster0-b4fmv.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true`
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch(err => {
    console.log(err);
  });
