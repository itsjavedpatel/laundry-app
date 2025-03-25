const express = require("express");
const { getUnidata } = require("../controllers/universityController");
const universityRouter = express.Router();

// get university data
universityRouter.get("/get-data", getUnidata);

module.exports = universityRouter;
