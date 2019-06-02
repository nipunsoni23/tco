const express = require("express");
const router = express.Router();

// models
const Subject = require("../../models/subject");

// to get list of all subjects
router.get("/subjects", (req, res) => {
  Subject.find((err, subjects) => {
    if (err) {
      return console.log(err);
    }
    res.json(subjects);
  });
});

// get subject by passing name in the url
router.get("/subject", (req, res) => {
  if (!req.query.name) {
    return res.status(400).send("Missing URL parameter: name");
  }
  Subject.find({ name: req.query.name })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// to add a new subject to the db
router.post("/add-subject", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const subject = new Subject(req.body);

  subject
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

// PUT - update a specific subject's info by passing subject's name in the url.
router.put("/subject", (req, res) => {
  if (!req.query.name) {
    return res.status(400).send("Missing URL parameter: name");
  }
  Subject.findOneAndUpdate({ name: req.query.name }, req.body, { new: true })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// DELETE - to remove a subject from the db by passing name to the url.
router.delete("/subject", (req, res) => {
  if (!req.query.name) {
    return res.status(400).send("Missing URL parameter: name");
  }
  Subject.findOneAndDelete({ name: req.query.name })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
