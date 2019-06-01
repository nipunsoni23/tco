const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// routes
const learnerRoute = require("./routes/learner");
const trainerRoute = require("./routes/trainer");

// express app
const app = express();

// middlewares
app.use(express.static("public"));
app.use(bodyParser.json());

// routing middleware
app.use(learnerRoute);
app.use(trainerRoute);

// default port
const PORT = 3000;

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
