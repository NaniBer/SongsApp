require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const user = require("./routes/userRoute");
const guest = require("./routes/GuestRoute");
const playlist = require("./routes/playlistRoute");
const cors = require("cors");
const { registerUser, getUserId } = require("./controller/userController");

const app = express();
app.use(cors());

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
app.use("/playlist", playlist);
app.post("/register", async (req, res) => {
  const { clerkId, firstName, lastName, email } = req.body;
  console.log(req.body);

  console.log("clerkId", clerkId, firstName, lastName, email);
  try {
    const result = await registerUser(clerkId, firstName, lastName, email);

    // Send the response based on the result
    res.status(result.statusCode).json({
      success: result.success,
      statusCode: result.statusCode,
      message: result.message,
      user: result.user,
    });

    if (result.statusCode === 500) {
      throw new Error(
        "Internal server error occurred while registering the user."
      );
    }
  } catch (error) {
    console.error(
      "Internal server error occurred while registering the user:",
      error
    );
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error occurred while registering the song.",
    });
  }
});
app.get("/getUserId", async (req, res) => {
  const { clerkId } = req.query;

  try {
    if (!clerkId) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Clerk ID is required.",
      });
    }

    const userId = await getUserId(clerkId); // Assuming getUserId returns userId directly

    // Send the response based on the result
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User ID retrieved successfully.",
      userId: userId,
    });
  } catch (error) {
    console.error("Error occurred while retrieving user ID:", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error occurred while retrieving the user ID.",
    });
  }
});

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
