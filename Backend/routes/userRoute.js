const express = require("express");

const {
  addSongs,
  getSongs,
  updateSong,
  deleteSong,
  countSongs,
} = require("../controller/songsController");
const router = express.Router();
router.get("/", async (req, res) => {
  res.json("hello from user route");
});

router.post("/addSongs", async (req, res) => {
  const {
    title,
    artist,
    album,
    genre,
    releaseDate,
    duration,
    createdAt,
    user,
  } = req.body;

  try {
    const result = await addSongs(
      title,
      artist,
      album,
      genre,
      releaseDate,
      duration,
      createdAt,
      user
    );

    // Send the response based on the result
    res.status(result.statusCode).json({
      success: result.success,
      statusCode: result.statusCode,
      message: result.message,
      song: result.song,
    });

    if (result.statusCode === 500) {
      throw new Error(
        "Internal server error occurred while registering the song."
      );
    }
  } catch (error) {
    console.error(
      "Internal server error occurred while registering the song:",
      error
    );
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error occurred while registering the song.",
    });
  }
});

module.exports = router;

//Get songs registered by a user
router.get("/getSongs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await getSongs(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No song found with the given ID",
        song: null,
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Song fetched successfully",
      song: result,
    });
  } catch (error) {
    // Handle any errors that occur
    console.error("Error fetching song:", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      song: null,
    });
  }
});

//update a song
router.put("/updateSong/:id", async (req, res) => {
  try {
    const songId = req.params.id;
    if (!songId) {
      return res.status(400).json({ success: false, error: "Invalid Song ID" });
    }

    const { title, artist, album, genre, releaseDate, duration } = req.body;
    const result = await updateSong(
      songId,
      title,
      artist,
      album,
      genre,
      releaseDate,
      duration
    );

    res.status(result.statusCode).json({
      success: result.success,
      statusCode: result.statusCode,
      message: result.message,
      updatedSong: result.song,
    });
  } catch (error) {
    console.error("Error updating song:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/deleteSong/:id", async (req, res) => {
  const songId = req.params.id;

  try {
    const result = await deleteSong(songId);

    res.status(result.statusCode).json({
      success: result.success,
      statusCode: result.statusCode,
      message: result.message,
      song: result.song,
    });
  } catch (error) {
    console.error("Error deleting song:", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error occurred while deleting the song.",
    });
  }
});

router.get("/countSongs/:id", async (req, res) => {
  const userid = req.params.id;
  try {
    const result = await countSongs(userid);
    console.log(result);
  } catch (error) {
    console.error("Error deleting song:", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error occurred while deleting the song.",
    });
  }
});

module.exports = router;
