const express = require("express");
const router = express.Router();

// models
const Semester = require("../../models/semester");

// to get list of all semesters
router.get("/semesters", (req, res) => {
  Semester.find((err, semesters) => {
    if (err) {
      return console.log(err);
    }
    res.json(semesters);
  });
});

// get semester by passing semester number in the url
router.get("/program", (req, res) => {
  if (!req.query.number) {
    return res.status(400).send("Missing URL parameter: number");
  }
  Semester.find({ number: req.query.number })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// to add a new semester to the db
router.post("/add-semester", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const semester = new Semester(req.body);

  semester
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

// PUT - update a specific semester's info by passing semester's number in the url.
router.put("/semester", (req, res) => {
  if (!req.query.number) {
    return res.status(400).send("Missing URL parameter: number");
  }
  Semester.findOneAndUpdate({ number: req.query.number }, req.body, {
    new: true
  })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// DELETE - to remove a semester from the db by passing its number to the url.
router.delete("/program", (req, res) => {
  if (!req.query.number) {
    return res.status(400).send("Missing URL parameter: number");
  }
  Semester.findOneAndDelete({ number: req.query.number })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
