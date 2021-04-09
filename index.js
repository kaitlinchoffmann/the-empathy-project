require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const answerRoutes = require("./server/routes/answers");
const questionRoutes = require("./server/routes/questions");

mongoose.connect("mongodb://localhost:27017/empathy", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connection Open!");
  })
  .catch(err => {
    console.log("error!!!");
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //To parse JSON bodies (Applicable for Express 4.16+)

app.set("view engine", "ejs");
// app.use(express.static(__dirname + "public"));  
app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //update to accept only from domain expected request is coming from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

// define routes
app.use("/", questionRoutes);
app.use('/answers', answerRoutes);

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
