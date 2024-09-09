import React from "react";
import AlbumIcon from "@mui/icons-material/Album";
import PersonIcon from "@mui/icons-material/Person";

interface NewReleaseProps {
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  releaseDate?: Date;
  duration?: number;
  user?: string;
}

const NewRelease: React.FC<NewReleaseProps> = ({
  title,
  artist,
  album,
  genre,
  releaseDate,
  duration,
}) => {
  return (
    <div className="m-4">
      <p className="font-semibold text-xl mb-8 text-gray-300">New Release</p>
      <div className="mb-4 bg-bgColor rounded-2xl p-6 shadow-lg flex justify-between items-center">
        {/* Left section with song details */}
        <div>
          <p className="text-xl font-bold text-gray-200">{title}</p>
          <p className="text-base mt-2 flex items-center text-gray-300">
            <PersonIcon fontSize="medium" className="mr-2" />
            <span>{artist}</span>
          </p>
          <p className="text-base mt-3 flex items-center text-gray-300">
            <AlbumIcon fontSize="medium" className="mr-2" />
            <span>{album || "N/A"}</span>
          </p>
          <p className="text-base mt-4 text-gray-300">
            <strong>Genre:</strong> {genre || "N/A"}
          </p>

          <button className="bg-btnColor text-white font-semibold py-2 px-4 mt-5 rounded-lg shadow-md transition duration-300 ease-in-out">
            View Details
          </button>
        </div>

        <div className="text-right">
          <p className="text-base text-gray-300">
            <strong>Release Date:</strong>{" "}
            {releaseDate ? releaseDate.toDateString() : "N/A"}
          </p>
          <p className="text-base text-gray-300 mt-3">
            <strong>Duration:</strong>{" "}
            {duration ? `${duration} seconds` : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewRelease;
