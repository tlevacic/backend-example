const express = require("express"); //node js library for BE
const mongoose = require("mongoose"); // package for mongoDB
const User = require("./models/User"); //model for mongoDB
require("dotenv/config");

//1. create instance of express server
var app = express();

//routing
app.get("/", function (request, response) {
  response.send("Hello World!");
});

app.get("/test", function (request, response) {
  response.send("Hello test!");
});

//work with database
app.get("/all-users", async (req, res, next) => {
  try {
    const users = await User.find().exec((err, result) => {
      res.json(result);
    });
  } catch (error) {
    res.json(error);
  }
});

//Returns user
app.get("/user-current", async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.query.id });
    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    res.json(error);
  }
});

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  console.log("Connected to DB")
);

const port = 3000;

//start server
app.listen(port, function () {
  console.log("Started application on port %d", port);
});
