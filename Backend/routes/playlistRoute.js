const express = require("express");
const router = express.Router();
const {
  createPlaylist,
  getPlaylistsOfUser,
  updatePlaylist,
  deletePlaylist,
  countPlaylists,
  searchPlaylist,
  getNewPlaylistOfUser,
} = require("../controller/playlistController");
const Playlist = require("../model/playlist");
router.post("/createPlaylist", async (req, res) => {
  const { name, description, songs, user } = req.body;
  console.log(name, description, songs, user);

  try {
    const result = await createPlaylist(name, description, songs, user);

    // Check for successful playlist creation
    if (!result.success) {
      return res.status(result.statusCode).json({
        success: result.success,
        statusCode: result.statusCode,
        message: result.message,
      });
    }

    // Send the successful response with the created playlist
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Playlist created successfully",
      playlist: result.playlist,
    });
  } catch (error) {
    console.error(
      "Internal server error occurred while creating the playlist:",
      error
    );
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error occurred while creating the playlist.",
    });
  }
});

router.get("/getPlaylistsOfUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await getPlaylistsOfUser(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No playlist found with the given ID",
        playlist: null,
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Playlist fetched successfully",
      playlist: result,
    });
  } catch (error) {
    // Handle any errors that occur
    console.error("Error fetching playlist:", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      playlist: null,
    });
  }
});
router.get("/getNew/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await getNewPlaylistOfUser(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "No playlist found with the given ID",
        playlist: null,
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Playlist fetched successfully",
      playlist: result,
    });
  } catch (error) {
    // Handle any errors that occur
    console.error("Error fetching playlist:", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      playlist: null,
    });
  }
});

router.put("/updatePlaylist/:id", async (req, res) => {
  try {
    const playlistId = req.params.id;
    const userId = req.body.userid;
    if (!playlistId) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Playlist ID" });
    }

    const { name, description, songs } = req.body;
    const result = await updatePlaylist(
      playlistId,
      name,
      description,
      songs,
      userId
    );

    res.status(result.statusCode).json({
      success: result.success,
      statusCode: result.statusCode,
      message: result.message,
      updatedPlaylist: result.playlist,
    });
  } catch (error) {
    console.error("Error updating playlist:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/deletePlaylist/:id", async (req, res) => {
  const songId = req.params.id;
  const userId = req.body.userId;

  try {
    const result = await deletePlaylist(songId, userId);

    res.status(result.statusCode).json({
      success: result.success,
      statusCode: result.statusCode,
      message: result.message,
      playlist: result.playlist,
    });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error occurred while deleting the playlist.",
    });
  }
});
router.get("/countPlaylist/:id", async (req, res) => {
  const userid = req.params.id;
  try {
    const result = await countPlaylist(userid);

    // Send the result back in the response
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: result, // Return the counting result
      message: "Playlist counted successfully",
    });
  } catch (error) {
    console.error("Error counting playlists:", error);

    // Handle any errors that occur
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error occurred while counting the playlist.",
    });
  }
});
router.get("/searchPlaylist", async (req, res) => {
  const { userid, name } = req.query; // Use req.query for query parameters

  try {
    const result = await searchPlaylist(userid, name);

    // Send the result back to the client
    res.status(result.statusCode).json({
      success: result.success,
      statusCode: result.statusCode,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Error processing searching playlists:", error);

    // Handle any unexpected errors
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error occurred while serching the playlist.",
    });
  }
});

router.get("/get", async (req, res) => {
  const playlists = await Playlist.find();
  console.log(playlists);
});

module.exports = router;
