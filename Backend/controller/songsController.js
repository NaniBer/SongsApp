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

//count songs
const countSongs = async (userid) => {
  try {
    // Using Promise.all to execute all queries in parallel for better performance
    const [songs, artists, albums, genres] = await Promise.all([
      Songs.find({ user: userid }).select("_id"), // Only select _id to minimize data transfer
      Songs.distinct("artist", { user: userid }),
      Songs.distinct("album", { user: userid }),
      Songs.distinct("genre", { user: userid }),
    ]);

    // Counting the lengths of each result
    const totalSongs = songs.length;
    const totalArtists = artists.length;
    const totalAlbums = albums.length;
    const totalGenres = genres.length;

    return {
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
    };
  } catch (error) {
    console.error("Error counting songs data:", error);
    return {
      success: false,
      message: "Failed to count songs data",
      error: error.message,
    };
  }
};

const searchByAlbum = async (userid, album) => {
  try {
    const songs = await Songs.find({ user: userid, album: album });

    return {
      success: true,
      statusCode: 200,
      data: songs,
      message:
        songs.length > 0 ? "Songs found" : "No songs found in this album",
    };
  } catch (error) {
    console.error("Error searching songs by album:", error);
    return {
      success: false,
      statusCode: 500,
      message:
        "Internal server error occurred while searching for songs by album.",
    };
  }
};

const searchByArtist = async (userid, artist) => {
  try {
    const songs = await Songs.find({ user: userid, artist: artist });

    return {
      success: true,
      statusCode: 200,
      data: songs,
      message:
        songs.length > 0 ? "Songs found" : "No songs found for this artist",
    };
  } catch (error) {
    console.error("Error searching songs by artist:", error);
    return {
      success: false,
      statusCode: 500,
      message:
        "Internal server error occurred while searching for songs by artist.",
    };
  }
};

const searchSong = async (userid, title) => {
  try {
    const song = await Songs.find({ user: userid, title: title });

    return {
      success: true,
      statusCode: 200,
      data: song,
      message: song.length > 0 ? "Song(s) found" : "No songs found",
    };
  } catch (error) {
    console.error("Error searching songs by title:", error);
    return {
      success: false,
      statusCode: 500,
      message:
        "Internal server error occurred while searching for songs by title.",
    };
  }
};

module.exports = {
  addSongs,
  getSongs,
  updateSong,
  deleteSong,
  countSongs,
  searchByAlbum,
  searchByArtist,
  searchSong,
};
