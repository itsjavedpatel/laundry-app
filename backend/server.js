const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const universityRouter = require("./routes/universityRoutes");

const app = express();

// Allow frontend request
app.use(cors());
// parse JSON requests
app.use(express.json());
// using cookie parser middleware
app.use(cookieParser());
// create PORT
app.get("/", (req, res) => {
  res.send("Hello");
});
const PORT = process.env.PORT || 3000;

//? middleware:passing form data
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
    console.log("Db connected succesfully");
  })
  .catch((error) => {
    console.log("Db is not connected", error);
  });

app.use("/auth", authRouter);
app.use("/university", universityRouter);
