const express = require("express");

const {
  addSongs,
  getSongs,
  updateSong,
  deleteSong,
  countSongs,
  searchByAlbum,
  searchByArtist,
  searchSong,
  getAlbums,
} = require("../controller/songsController");
const { getUserId } = require("../controller/userController");
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
  const clerkId = req.params.id;
  const userId = await getUserId(clerkId);

  try {
    const result = await getSongs(userId);

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

    // Send the result back in the response
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: result, // Return the counting result
      message: "Songs counted successfully",
    });
  } catch (error) {
    console.error("Error counting songs:", error);

    // Handle any errors that occur
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error occurred while counting the songs.",
    });
  }
});

router.get("/searchByAlbum", async (req, res) => {
  const { userid, album } = req.body;

  try {
    const result = await searchByAlbum(userid, album);

    // Check if the search was successful
    if (result.success) {
      res.status(result.statusCode).json({
        success: result.success,
        statusCode: result.statusCode,
        data: result.data,
        message: result.message,
      });
    } else {
      // Handle the case where the search was not successful
      res.status(result.statusCode).json({
        success: result.success,
        statusCode: result.statusCode,
        message: result.message,
      });
    }
  } catch (error) {
    console.error("Error searching songs by album:", error);

    // Handle any unexpected errors
    res.status(500).json({
      success: false,
      statusCode: 500,
      message:
        "Internal server error occurred while searching for songs by album.",
    });
  }
});

router.get("/searchByArtist", async (req, res) => {
  const { userid, artist } = req.body;

  try {
    const result = await searchByArtist(userid, artist);

    // Check if the search was successful
    if (result.success) {
      res.status(result.statusCode).json({
        success: result.success,
        statusCode: result.statusCode,
        data: result.data,
        message: result.message,
      });
    } else {
      // Handle the case where the search was not successful
      res.status(result.statusCode).json({
        success: result.success,
        statusCode: result.statusCode,
        message: result.message,
      });
    }
  } catch (error) {
    console.error("Error searching songs by album:", error);

    // Handle any unexpected errors
    res.status(500).json({
      success: false,
      statusCode: 500,
      message:
        "Internal server error occurred while searching for songs by album.",
    });
  }
});

router.get("/searchSong", async (req, res) => {
  const { userid, title } = req.query; // Use req.query for query parameters

  try {
    const result = await searchSong(userid, title);

    // Send the result back to the client
    res.status(result.statusCode).json({
      success: result.success,
      statusCode: result.statusCode,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Error processing searchSong request:", error);

    // Handle any unexpected errors
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error occurred while processing the request.",
    });
  }
});

router.get("/getNewRelasedSong/:id", async (req, res) => {
  const clerkId = req.params.id;
  try {
    const userId = await getUserId(clerkId);
    const result = await getNewRelasedSong(userId);
    res.status(result.statusCode).json({
      success: result.success,
      statusCode: result.statusCode,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Error processing getNewRelasedSong request:", error);

    // Handle any unexpected errors
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error occurred while processing the request.",
    });
  }
});
router.get("/getAlbums/:id", async (req, res) => {
  const clerkId = req.params.id;
  try {
    const userId = await getUserId(clerkId);
    const result = await getAlbums(userId);
    res.status(result.statusCode).json({
      success: result.success,
      statusCode: result.statusCode,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Error processing getAlbums request:", error);
  }
});

module.exports = router;
