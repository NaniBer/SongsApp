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
      <p className="font-semibold text-2xl mb-4  text-gray-300">
        Playlist Pick{" "}
      </p>
      <div className="mb-8 bg-bgColor rounded-2xl p-10 shadow-lg flex justify-between items-center">
        <div>
          <p className="text-xl font-bold text-gray-200">{name}</p>
          <p className=" mt-3 flex items-center text-gray-300">
            <DescriptionIcon fontSize="medium" className="mr-1" />
            <span>{description}</span>
          </p>
          <p className="mt-3 flex items-center text-gray-300">
            <MusicNoteIcon fontSize="medium" className="mr-1" />
            <span>{songs?.length} Songs</span>
          </p>

          <button className="bg-btnColor text-white font-semibold py-1 px-2 mt-3 rounded-lg shadow-md transition duration-300 ease-in-out">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPick;
