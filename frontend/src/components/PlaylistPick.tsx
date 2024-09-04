import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

interface PlaylistPickProps {
  name: string;
  description?: string;
  songs: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PlaylistPick: React.FC<PlaylistPickProps> = ({
  name,
  description,
  songs,
  createdAt,
  updatedAt,
}) => {
  return (
    <div className="p-4 pt-2">
      <p className="font-semibold text-4xl mb-8 text-gray-300">
        Playlist Pick{" "}
      </p>
      <div className="mb-8 bg-bgColor rounded-2xl p-10 shadow-lg flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold text-gray-200">{name}</p>
          <p className="text-xl mt-6 flex items-center text-gray-300">
            <DescriptionIcon fontSize="large" className="mr-2" />
            <span>{description}</span>
          </p>
          <p className="text-xl mt-6 flex items-center text-gray-300">
            <MusicNoteIcon fontSize="large" className="mr-2" />
            <span>{songs.length} Songs</span>
          </p>

          <button className="bg-btnColor text-white font-semibold py-2 px-4 mt-5 rounded-lg shadow-md transition duration-300 ease-in-out">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPick;
