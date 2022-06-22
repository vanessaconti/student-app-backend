const express = require("express");
const controller = express.Router();

const studentData = require("../studentData.json");

controller.get("/", (request, response) => {
  response.json(studentData);
});

//write a route that accepts a student id as part of the path
//returning an object (json), representing the student with that id
controller.get("/:id", (request, response) => {
  const studentId = request.params.id;

  if (!/[0-9]/.test(studentId)) {
    response.send("Student ID Must Be A Number.");
    return;
  }

  const singleStudent = studentData.students.find((student) => {
    return student.id === studentId;
  });

  console.log(singleStudent);
  if (singleStudent) {
    response.json(singleStudent);
  } else {
    response.send("Student Not Found");
  }
});

module.exports = controller;
