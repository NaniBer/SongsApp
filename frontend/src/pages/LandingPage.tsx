import React, { useState } from "react";
import LeftSideNav from "../components/LeftSideNav";
import DashboardPage from "../pages/DashboardPage";
import BrowsePage from "./BrowsePage";
import PlaylistPage from "./PlaylistPage";
import AlbumsPage from "./AlbumsPage";

const LandingPage = () => {
  const [activePage, setActivePage] = useState<string>("Home");

  const renderContent = () => {
    switch (activePage) {
      case "Home":
        return <DashboardPage />;
      case "Browse":
        return <BrowsePage />;
      case "Playlist":
        return <PlaylistPage />;
      case "Albums":
        return <AlbumsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex items-center justify-center bg-custom-image bg-cover bg-center h-screen relative py-10">
      <div className="w-[2000px] h-[980px] bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-lg">
        <div className="flex flex-col md:flex-row items-start h-full">
          <LeftSideNav setActivePage={setActivePage} />
          <div className="flex-grow h-full">
            {/* Render content with fixed dimensions */}
            <div className="w-full h-full bg-opacity-60 rounded-lg overflow-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
