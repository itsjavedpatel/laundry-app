const express = require("express");
const authRouter = express.Router();
const { login, register } = require("../controllers/authControllers");
//! login
authRouter.post("/login", login);
authRouter.post("/register", register);
module.exports = authRouter;
