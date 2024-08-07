require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const user = require("./routes/userRoute");
const guest = require("./routes/GuestRoute");

const app = express();

const url = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/user", user);
app.use("/guest", guest);

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });

module.exports = app;
