const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express(bodyParser.json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("home");
});

app.post("/addLearners", (req, res) => {});

function getLearners() {}

//MitWswv8udRKltAM;268DgAHVugeO4wD2

mongoose
  .connect(
    `mongodb+srv://ashishk:ieJYCx0QICd4Cfoq@cluster0-h8cgc.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server running on port {PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
