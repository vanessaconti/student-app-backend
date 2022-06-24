const express = require("express");
const { response } = require("../app");
const controller = express.Router();

const studentData = require("../studentData.json");

controller.get("/", (request, response) => {
  //how do i handle a query string?

  let { limit = 25, min, max } = request.query; // "10"

  limit = Number(limit);

  let studentDataForDelivery = { ...studentData };

  studentDataForDelivery.students = studentDataForDelivery.students.slice(
    0,
    limit
  );

  response.json(studentDataForDelivery);
});

//how do i change the student data according to the limit?

//studentData.students = [ 25 items]

// studentData.students = studentData.students.slice(0, limit);

// response.json(studentData);

//SELECT * FROM students
// if(!min && !max){
//  SELECT * FROM students LIMIT $1, [limit]
//} else {
// SELECT * FROM students WHERE id >= $1 AND id <= $2 LIMIT $3, [min, max, limit]
//}

//write a route that accepts a student id as part of the path
//returning an object (json), representing the student with that id
controller.get("/:id", (request, response) => {
  try {
    const studentId = request.params.id;

    if (!/[0-9]/.test(studentId)) {
      response.send("Student ID Must Be A Number.");
      return;
    }

    const singleStudent = studentData.students.find((student) => {
      return student.id === studentId;
    });

    //console.log(singleStudent);
    if (singleStudent) {
      response.json(singleStudent);
    } else {
      response.send("Student Not Found");
    }
  } catch (err) {
    response.status(500).send("An Error Occurred");
  }
});

module.exports = controller;
