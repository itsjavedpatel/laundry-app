const express = require("express");
const {
  getUnidata,
  addStudent,
} = require("../controllers/universityController");
const { authUser } = require("../middlewares/authentication");
const universityRouter = express.Router();

// get university data

universityRouter.get("/get-data", authUser, getUnidata);
universityRouter.post("/add-student", authUser, addStudent);
module.exports = universityRouter;
