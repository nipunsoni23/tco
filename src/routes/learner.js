const express = require("express");
const router = express.Router();

// models
const Learner = require("../../models/learner");

// to get list of all learners
router.get("/learners", (req, res) => {
  Learner.find((err, learners) => {
    if (err) {
      return console.log(err);
    }
    res.json(learners);
    // res.send(learners);
  });
});

// to add a new learner to the db
router.post("/addLearner", (req, res) => {
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

module.exports = router;
