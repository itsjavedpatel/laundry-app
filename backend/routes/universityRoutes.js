const express = require("express");
const {
  getUnidata,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/universityController");
const { authUser } = require("../middlewares/authentication");
const universityRouter = express.Router();

// get university data
universityRouter.get("/get-data", authUser, getUnidata);

// add student
universityRouter.post("/add-student", authUser, addStudent);

// update student status
universityRouter.put("/update-student", updateStudent);

//delete student 
universityRouter.delete("/delete-student/:studentId", authUser, deleteStudent);

module.exports = universityRouter;
