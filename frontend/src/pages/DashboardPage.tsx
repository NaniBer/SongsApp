import React from "react";
import SearchBar from "../components/SearchBar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

interface DashboardPageProps {
  title: string;
  description: string;
  items: string[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  title,
  description,
  items,
}) => {
  const handleSearch = (text: string) => {
    console.log(text);
  };
  return (
    <div className="flex">
      {/* <h1>{title}</h1>
      <p>{description}</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul> */}
      <p>My Library</p>
      <div className="">
        <div className="flex gap-4">
          <div className="rounded-full w-80 border-2 border-gray-200 h-12">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="rounded-full w-full">
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
    </div>
  );
};

export default DashboardPage;
