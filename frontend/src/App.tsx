import React from "react";
import LeftSideNav from "./components/LeftSideNav"; // Adjust the path
import DashboardPage from "./pages/DashboardPage"; // Adjust the path

const App: React.FC = () => {
  return (
    <div className="flex h-screen">
      <LeftSideNav />
      <div className="flex-grow p-5">
        <DashboardPage
          title="Dashboard"
          description="This is the dashboard page."
          items={["Item 1", "Item 2", "Item 3"]}
        />
      </div>
    </div>
  );
};
export default App;
