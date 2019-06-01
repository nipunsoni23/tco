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
