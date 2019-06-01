const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// routes
const learnerRoute = require("./src/routes/learner");
const trainerRoute = require("./src/routes/trainer");
const programRoute = require("./src/routes/program");
const semesterRoute = require("./src/routes/semester");
const subjectRoute = require("./src/routes/subject");

// express app
const app = express();

// middlewares
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());

// to check what pages are requested by the users.
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
  next();
});

// routing middleware
app.use(learnerRoute);
app.use(trainerRoute);
app.use(programRoute);
app.use(semesterRoute);
app.use(subjectRoute);

// default port
const PORT = 3000;

// set the view engine to ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

// error 404 not found
app.use((req, res, next) => {
  res.status(404).render("pages/404");
});

// error 500 internal server error
app.use((err, req, res, next) => {
  console.error(err);
  res.render("pages/500");
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

/**
 * TODO
 *
 * test run program semster and subject routes
 * email verification
 * schema references
 * arrays of schema
 *
 */
