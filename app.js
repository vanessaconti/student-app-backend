//import code for express
const express = require("express");

// initialize app
const app = express();

const studentsController = require("./controllers/studentsController");
const namesController = require("./controllers/namesController");

//telling app "if anything comes to students path use the students controller"
//so anything that comes in to port 9000 with /students app will user the students controller
app.use("/students", studentsController);
app.use("/names", namesController);

// route
app.get("/", (request, response) => {
  response.send("Hello world!");
});

// export app
module.exports = app;
