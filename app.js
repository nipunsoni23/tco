const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// models
const Learner = require("./models/learner");

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.get("/", (req, res) => {
  Learner.find(result => {
    res.send(result);
    console.log(result);
  }).catch(err => {
    console.log(err);
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  const learner = new Learner({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  learner.save().catch(err => {
    console.log(err);
  });
});

mongoose
  .connect(
    `mongodb+srv://ekta:ekta123@cluster0-h8cgc.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server running on port 3000`);
    });
  })
  .catch(err => {
    console.log(err);
  });
