import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DateRangeIcon from "@mui/icons-material/DateRange";
import TimelapseIcon from "@mui/icons-material/Timelapse";

interface SongProps {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  releaseDate?: Date;
  duration?: number;
  user?: string;
  fav: boolean;
}
interface PlaylistProps {
  name: string;
  description?: string;
  songs: string[];
  createdAt: Date;
  updatedAt: Date;
}
interface ArtistProps {
  name: string;
  totalSongs: number;
  genre: string[];
  albums: string[];
  totalDuration: string;
}
interface AlbumsProps {
  name: string;
  artist?: string;
  songs: string[];
  user: string;
  releaseDate: Date;
  genre: string[];
}
interface RandomPickProps {
  songs?: SongProps;
  artist?: ArtistProps;
  album?: AlbumsProps;
  playlist?: PlaylistProps;
}

const RandomPick: React.FC<RandomPickProps> = ({
  songs,
  artist,
  album,
  playlist,
}) => {
  return (
    <div className="p-4 pt-2">
      {playlist && (
        <div>
          <p className="font-semibold text-2xl mb-4 text-gray-300">
            Playlist Pick{" "}
          </p>
          <div className="mb-8 bg-bgColor rounded-2xl p-10 shadow-lg flex justify-between items-center">
            <div>
              <p className="text-xl font-bold text-gray-200">{playlist.name}</p>
              <p className="mt-3 flex items-center text-gray-300">
                <DescriptionIcon fontSize="medium" className="mr-1" />
                <span>{playlist.description}</span>
              </p>
              <p className="mt-3 flex items-center text-gray-300">
                <MusicNoteIcon fontSize="medium" className="mr-1" />
                <span>{playlist.songs.length} Songs</span>
              </p>
              <button className="bg-btnColor text-white font-semibold py-1 px-2 mt-3 rounded-lg shadow-md transition duration-300 ease-in-out">
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
      {album && (
        <div>
          <p className="font-semibold text-2xl mb-4 text-gray-300">
            Album Pick{" "}
          </p>
          <div className="mb-8 bg-bgColor rounded-2xl p-10 shadow-lg flex justify-between items-center">
            <div>
              <p className="text-xl font-bold text-gray-200">{album.name}</p>
              <p className="mt-3 flex items-center text-gray-300">
                <DescriptionIcon fontSize="medium" className="mr-2" />
                <span>{album.artist}</span>
              </p>
              <p className=" mt-3 flex text-gray-200">
                <MusicNoteIcon
                  fontSize="medium"
                  className="text-indigo-400 mb-2"
                />
                <span className="font-medium tracking-wide mr-10">
                  {album.songs.length} Songs
                </span>
                <ul className="mt-2 list-disc pl-5">
                  {album.songs.map((song, index) => (
                    <li key={index} className="text-gray-100">
                      {song}
                    </li>
                  ))}
                </ul>
              </p>

              <p className=" mt-4 flex flex-col ">
                <span className="font-medium text-gray-200">
                  Genre{album.genre.length > 1 ? "s" : ""}
                </span>
                <div className="flex flex-wrap gap-4 mt-4 ml-5 text-gray-300">
                  {album.genre.map((gen, index) => (
                    <span
                      key={index}
                      className="bg-btnColor rounded-2xl py-2 px-4"
                    >
                      {gen}
                    </span>
                  ))}
                </div>
              </p>

              <p className="text-xl mt-6 flex items-center text-gray-300">
                <DateRangeIcon fontSize="medium" className="mr-2" />
                <span>{album.releaseDate.toDateString()} </span>
              </p>
              <button className="bg-btnColor text-white font-semibold py-1 px-2 mt-3 rounded-lg shadow-md transition duration-300 ease-in-out">
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
      {artist && (
        <div>
          <p className="font-semibold text-2xl mb-4 text-gray-300">
            Artist Pick{" "}
          </p>
          <div className="mb-8 bg-bgColor rounded-2xl p-10 shadow-lg flex justify-between items-center">
            <div>
              <p className="text-xl font-bold text-gray-200">{artist.name}</p>
              <p className="mt-3 flex items-center text-gray-300">
                <MusicNoteIcon fontSize="medium" className="mr-2" />
                <span>{artist.totalSongs} Songs</span>
              </p>
              <p className="mt-3 flex flex-col ">
                <span className="font-medium text-gray-200">
                  Genre{artist.genre.length > 1 ? "s" : ""}
                </span>
                <div className="flex flex-wrap gap-4 mt-4 ml-5 text-gray-300">
                  {artist.genre.map((gen, index) => (
                    <span
                      key={index}
                      className="bg-btnColor rounded-2xl py-2 px-4"
                    >
                      {gen}
                    </span>
                  ))}
                </div>
              </p>

              <p className="text-xl mt-6 flex items-center text-gray-300">
                <TimelapseIcon fontSize="medium" className="mr-1" />
                <span>Duration: {artist.totalDuration}</span>
              </p>
              <button className="bg-btnColor text-white font-semibold py-1 px-2 mt-3 rounded-lg shadow-md transition duration-300 ease-in-out">
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomPick;
