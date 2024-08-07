const Songs = require("../model/songs");

const addSongs = async (
  title,
  artist,
  album,
  genre,
  releaseDate,
  duration,
  createdAt,
  user
) => {
  try {
    // Check if the song already exists
    const existingSong = await Songs.findOne({ title, artist, user });

    if (existingSong) {
      // Return an object indicating the song already exists
      return {
        success: false,
        statusCode: 409,
        message: "Song already registered",
      };
    }

    // Create a new song
    const newSong = new Songs({
      title,
      artist,
      album,
      genre,
      releaseDate,
      duration,
      createdAt,
      user,
    });

    // Save the new song to the database
    await newSong.save();

    // Return an object indicating success
    return {
      success: true,
      statusCode: 201,
      message: "Song registered successfully",
      song: newSong,
    };
  } catch (error) {
    console.error("Error adding song:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Internal server error",
    };
  }
};

const getSongs = async (id) => {
  try {
    const song = await Songs.find({ user: id });
    if (song.length == 0) {
      return null;
    }
    return song;
  } catch (error) {
    console.error("Error retrieving song:", error);
    throw new Error("Internal server error");
  }
};

const updateSong = async (
  songId,
  title,
  artist,
  album,
  genre,
  releaseDate,
  duration
) => {
  console.log(songId);
  try {
    const existingSong = await Songs.findById(songId);

    if (!existingSong) {
      return { success: false, statusCode: 404, message: "Song not found" };
    }

    existingSong.title = title;
    existingSong.artist = artist;
    existingSong.album = album;
    existingSong.genre = genre;
    existingSong.releaseDate = releaseDate;
    existingSong.duration = duration;
    await existingSong.save();
    return {
      success: true,
      statusCode: 201,
      message: "Song updated successfully",
      song: existingSong,
    };
  } catch (error) {
    console.error("Error retrieving song:", error);
    throw new Error("Internal server error");
  }
};

//delete Song
const deleteSong = async (songId) => {
  try {
    const result = await Songs.deleteOne({ _id: songId });

    if (result.deletedCount === 0) {
      return {
        statusCode: 404,
        success: false,
        message: "No record found for the given ID",
        deletedCount: null,
      };
    }
    console.log(result);

    return {
      success: true,
      statusCode: 200,
      deletedCount: result.deletedCount,
      message: "Song deleted",
    };
  } catch (error) {
    console.error("Error deleting song:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Internal server error",
    };
  }
};

module.exports = {
  addSongs,
  getSongs,
  updateSong,
  deleteSong,
};
