const express = require("express");
const router = express.Router();

// models
const Program = require("../../models/program");

// to get list of all programs
router.get("/programs", (req, res) => {
  Program.find((err, programs) => {
    if (err) {
      return console.log(err);
    }
    res.json(program);
  });
});

// get program by passing name in the url
router.get("/program", (req, res) => {
  if (!req.query.name) {
    return res.status(400).send("Missing URL parameter: name");
  }
  Program.find({ name: req.query.name })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// to add a new program to the db
router.post("/add-program", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const program = new Program(req.body);

  program
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

// PUT - update a specific programs's info by passing program's name in the url.
router.put("/program", (req, res) => {
  if (!req.query.name) {
    return res.status(400).send("Missing URL parameter: name");
  }
  Program.findOneAndUpdate({ name: req.query.name }, req.body, { new: true })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// DELETE - to remove a program from the db by passing name to the url.
router.delete("/program", (req, res) => {
  if (!req.query.name) {
    return res.status(400).send("Missing URL parameter: name");
  }
  Program.findOneAndDelete({ name: req.query.name })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
