import React from "react";
import AlbumIcon from "@mui/icons-material/Album";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const NewRelease = () => {
  const newRealsedSong = useSelector(
    (state: RootState) => state.song.newRelasedSong
  );
  const formatDuration = (durationInSeconds: number) => {
    const minutes = Math.floor(durationInSeconds / 60); // Get the number of minutes
    const seconds = durationInSeconds % 60; // Get the remaining seconds
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; // Format as MM:SS
  };

  console.log(newRealsedSong);
  return (
    <div className="m-4">
      <p className="font-semibold text-xl mb-8 text-gray-300">New Release</p>
      <div className="mb-4 bg-bgColor rounded-2xl p-6 shadow-lg flex justify-between items-center">
        {/* Left section with song details */}
        <div>
          <p className="text-xl font-bold text-gray-200">
            {newRealsedSong?.title}
          </p>
          <p className="text-base mt-2 flex items-center text-gray-300">
            <PersonIcon fontSize="medium" className="mr-2" />
            <span>{newRealsedSong?.artist}</span>
          </p>
          <p className="text-base mt-3 flex items-center text-gray-300">
            <AlbumIcon fontSize="medium" className="mr-2" />
            <span>{newRealsedSong?.album || "N/A"}</span>
          </p>
          <p className="text-base mt-4 text-gray-300">
            <strong>Genre:</strong> {newRealsedSong?.genre || "N/A"}
          </p>

          <button className="bg-btnColor text-white font-semibold py-2 px-4 mt-5 rounded-lg shadow-md transition duration-300 ease-in-out">
            View Details
          </button>
        </div>

        <div className="text-right">
          <p className="text-base text-gray-300">
            <strong>Release Date:</strong>{" "}
            {newRealsedSong?.releaseDate
              ? new Date(newRealsedSong.releaseDate).toDateString()
              : "N/A"}
          </p>
          <p className="text-base text-gray-300 mt-3">
            <strong>Duration:</strong>{" "}
            {newRealsedSong?.duration
              ? formatDuration(newRealsedSong.duration)
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewRelease;
