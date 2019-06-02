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

router.get("/trainer", (req, res) => {
  if (!req.query.name) {
    return res.status(400).send("Missing URL parameter: name");
  }
  Trainer.find({ name: req.query.name })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// to add a new trainer to the db
router.post("/add-trainer", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const trainer = new Trainer(req.body);

  trainer
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

// PUT - update a specific trainer's info by passing trainer's email in the url.
router.put("/trainer", (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("Missing URL parameter: email");
  }
  Trainer.findOneAndUpdate({ email: req.query.email }, req.body, { new: true })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// DELETE - to remove a trainer from the db by passing email to the url.
router.delete("/trainer", (req, res) => {
  if (!req.query.email) {
    return res.status(400).send("Missing URL parameter: email");
  }
  Trainer.findOneAndDelete({ email: req.query.email })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
