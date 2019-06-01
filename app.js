const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// models
const Learner = require("./models/learner");
const Trainer = require("./models/trainer");

const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.get("/learners", (req, res) => {
  Learner.find((err, learners) => {
    if (err) {
      return console.log(err);
    }
    res.json(learners);
  });
});

app.post("/addLearner", (req, res) => {
  Learner.findOne({ email: req.body.email }).then(user => {
    if (user) {
      throw new Error("This email is already registered.");
    }
    const learner = new Learner({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    learner.save().catch(err => {
      console.log(err);
    });
  });
});

// add a new trainer
app.post("/addTrainer", (req, res) => {
  Trainer.findOne({ email: req.body.email }).then(user => {
    if (user) {
      throw new Error("This email is already registered.");
    }

    const trainer = new Trainer({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      subject: req.body.subject,
      job_type: req.body.job_type
    });

    trainer.save().catch(err => {
      console.log(err);
    });
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
