const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const app = express();
// Allow frontend request
app.use(cors());
// parse JSON requests
app.use(express.json());

// create PORT
app.get("/", (req, res) => {
  res.send("Hello");
});

// getting sign in form data
// app.post("/api/form", (req, res) => {
//   console.log("Received Form Data:", req.body);
//   res.json({ message: "Form submitted successfully!", data: req.body });
// });

//? middleware:passing form data
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
app.use("/auth", authRouter);
