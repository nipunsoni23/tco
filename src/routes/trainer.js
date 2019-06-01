const express = require("express");
const router = express.Router();

// models
const Trainer = require("../../models/trainer");

// to get list of all learners
router.get("/trainers", (req, res) => {
  Trainer.find((err, trainer) => {
    if (err) {
      return console.log(err);
    }
    res.json(trainer);
  });
});

// search for a specific trainer
// for query string
router.get("/person", (req, res) => {
  if (req.query.name) {
    res.send(`you requested for the person ${req.query.name}`);
  } else {
    res.send("you requested a person");
  }
});

router.get("/trainers/:name", (req, res) => {
  res.send(`you requested for: ${req.params.name}`);
});

// to add a new trainer to the db
router.post("/addTrainer", (req, res) => {
  Trainer.findOne({ email: req.body.email }).then(user => {
    if (user) {
      throw new Error("This email is already registered.");
    }

    const trainer = new Trainer({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      subjects: req.body.subjects,
      job_type: req.body.job_type
    });

    trainer.save().catch(err => {
      console.log(err);
    });
  });
});

module.exports = router;
