import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import NewRelease from "../components/NewRelease";
import RightSideNav from "../components/RightSideNav";
import SongsList from "../components/SongsList";

interface DashboardPageProps {
  title: string;
  description: string;
  items: string[];
}
interface Song {
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  releaseDate?: Date;
  duration?: number;
  user?: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  title,
  description,
  items,
}) => {
  const [songList, setSongList] = useState<Song[]>([
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      album: "Divide",
      genre: "Pop",
      releaseDate: new Date("2017-01-06"),
      duration: 233,
      user: "60d21b4667d0d8992e610c85",
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      genre: "Synthwave",
      releaseDate: new Date("2019-11-29"),
      duration: 200,
      user: "60d21b4667d0d8992e610c86",
    },
    {
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      genre: "Disco-pop",
      releaseDate: new Date("2020-03-27"),
      duration: 203,
      user: "60d21b4667d0d8992e610c87",
    },
  ]);

  const handleSearch = (text: string) => {
    console.log(text);
  };
  return (
    <div>
      <div className="flex justify-between mt-7 mr-14">
        <div className="flex-1"></div>
        <div className="flex  items-end gap-4">
          <div className="rounded-full w-80 border-2 border-gray-200 h-12">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="rounded-full">
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              sx={{
                borderRadius: "9999px",
                height: "48px",
                backgroundColor: "#fea6ff",
                color: "black",
                fontWeight: 550,
                width: "150px",
              }}
            >
              Add music
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex">
          <div className="flex-grow p-4">
            <NewRelease {...songList[0]} />
          </div>
          <div className="w-1/4 p-4">
            <RightSideNav />
          </div>
        </div>
        <SongsList songs={songList} />
      </div>
    </div>
  );
};

export default DashboardPage;
