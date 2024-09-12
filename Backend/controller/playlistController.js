const Playlist = require("../model/playlist");

const createPlaylist = async (name, description, songs, user) => {
  try {
    // Check if the song already exists
    const existingPlaylist = await Playlist.findOne({ name, user });

    if (existingPlaylist) {
      // Return an object indicating the song already exists
      return {
        success: false,
        statusCode: 409,
        message: "Playlist already exists",
      };
    }

    // Create a new song
    const newPlaylist = new Playlist({
      name,
      description,
      songs,
      user,
    });

    // Save the new playlist to the database
    await newPlaylist.save();

    // Return an object indicating success
    return {
      success: true,
      statusCode: 201,
      message: "Playlist created successfully",
      playlist: newPlaylist,
    };
  } catch (error) {
    console.error("Error creating playlist:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Internal server error",
    };
  }
};

const getPlaylistsOfUser = async (userId) => {
  try {
    console.log(userId);
    // Find all playlists associated with the user
    const playlists = await Playlist.find({ user: userId });

    console.log(playlists);
    return {
      success: true,
      playlists: playlists,
    };
  } catch (error) {
    console.error("Error retrieving playlists:", error);
    return {
      success: false,
      message: "Failed to retrieve playlists",
      error: error.message,
    };
  }
};

const updatePlaylist = async (playlistId, name, description, userId) => {
  try {
    const existingPlaylist = await Playlist.findById(playlistId);

    if (!existingPlaylist) {
      return { success: false, statusCode: 404, message: "Playlist not found" };
    }

    if (existingPlaylist.user.toString() === userId) {
      existingPlaylist.name = name;
      existingPlaylist.description = description;
    } else {
      return {
        success: false,
        statusCode: 403,
        message: "You have no permission to edit this playlist",
      };
    }

    await existingPlaylist.save();
    return {
      success: true,
      statusCode: 200,
      message: "Playlist updated successfully",
      playlist: existingPlaylist,
    };
  } catch (error) {
    console.error("Error updating Playlist:", error);
    throw new Error("Internal server error");
  }
};

//delete playlist
const deletePlaylist = async (playlistId, userId) => {
  try {
    const result = await Playlist.deleteOne({ _id: playlistId, user: userId });

    if (result.deletedCount === 0) {
      return {
        success: false,
        statusCode: 404,
        message: "No playlist found for the given ID and user",
        deletedCount: 0,
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: "Playlist deleted successfully",
      deletedCount: result.deletedCount,
    };
  } catch (error) {
    console.error("Error deleting playlist:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Internal server error",
    };
  }
};

//count songs
const countPlaylists = async (userId) => {
  try {
    // Count the number of playlists associated with the user
    const totalPlaylists = await Playlist.countDocuments({ user: userId });

    return {
      success: true,
      totalPlaylists,
    };
  } catch (error) {
    console.error("Error counting playlists:", error);
    return {
      success: false,
      message: "Failed to count playlists",
      error: error.message,
    };
  }
};

const searchPlaylist = async (name, userId) => {
  try {
    // Find playlists by name
    const playlists = await Playlist.find({ name: name, user: userId });

    // Check if any playlists are found and belong to the user
    if (playlists.length > 0) {
      return {
        success: true,
        statusCode: 200,
        data: playlists,
        message: "Playlist(s) found",
      };
    } else {
      return {
        success: false,
        statusCode: 404,
        message: "No playlist found",
      };
    }
  } catch (error) {
    console.error("Error searching playlist:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Failed to search playlist",
      error: error.message,
    };
  }
};

module.exports = {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  getPlaylistsOfUser,
  countPlaylists,
  searchPlaylist,
};
