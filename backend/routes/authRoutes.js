const express = require("express");
const authRouter = express.Router();
const { login } = require("../controllers/authControllers");
//! login
authRouter.post("/api/form", login);
module.exports = authRouter;
