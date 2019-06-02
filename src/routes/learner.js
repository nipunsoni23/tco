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

// get learners by passing name in the url
router.get("/learner", (req, res) => {
  if (!req.query.name) {
    return res.status(400).send("Missing URL parameter: name");
  }
  Learner.find({ name: req.query.name })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// to add a new learner to the db
router.post("/add-learner", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const learner = new Learner(req.body);

  learner
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// PUT - update a specific learner's info by passing learner's email in the url.
router.put("/learner", (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("Missing URL parameter: email");
  }
  Learner.findOneAndUpdate({ email: req.query.email }, req.body, { new: true })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// DELETE - to remove a learner from the db by passing email to the url.
router.delete("/learner", (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("Missing URL parameter: email");
  }
  Learner.findOneAndDelete({ email: req.query.email })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
