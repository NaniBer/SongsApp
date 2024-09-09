import { useState } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import QueueMusicRoundedIcon from "@mui/icons-material/QueueMusicRounded";
import AlbumRoundedIcon from "@mui/icons-material/AlbumRounded";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";

interface SidebarProps {
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  const [activeButton, setActiveButton] = useState<string>("Home");

  const buttons = [
    { name: "Home", icon: <HomeRoundedIcon fontSize="small" /> },
    { name: "Browse", icon: <SearchRoundedIcon fontSize="small" /> },
    { name: "Playlist", icon: <QueueMusicRoundedIcon fontSize="small" /> },
    { name: "Albums", icon: <AlbumRoundedIcon fontSize="small" /> },
    { name: "Artists", icon: <Person2RoundedIcon fontSize="small" /> },
  ];
  const handleButtonClick = (buttonName: string) => {
    console.log(buttonName);
    setActiveButton(buttonName);
    setActivePage(buttonName);
  };

  return (
    <div className="m-4 mt-8">
      <p className="font-bold text-xl mb-10 pl-3 text-gray-200">My Music</p>
      <div className="flex flex-col divide-y divide-gray-300">
        <div className="flex flex-col gap-2 pb-3">
          {buttons.slice(0, 3).map((button) => (
            <button
              key={button.name}
              className={`flex items-center gap-4 px-5 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${
                activeButton === button.name
                  ? "bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg text-white"
                  : "hover:bg-gray-700 hover:shadow-lg"
              }`}
              onClick={() => handleButtonClick(button.name)}
            >
              {button.icon}
              <span className="font-medium">{button.name}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 pt-2">
          {buttons.slice(3).map((button) => (
            <button
              key={button.name}
              className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${
                activeButton === button.name
                  ? "bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg text-white"
                  : "hover:bg-gray-700 hover:shadow-lg"
              }`}
              onClick={() => handleButtonClick(button.name)}
            >
              {button.icon}
              <span className="font-medium">{button.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
