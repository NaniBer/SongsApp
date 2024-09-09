import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      fullWidth
      onChange={(e) => onSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "#FFFFFF" }} />{" "}
            {/* Set the icon color to white */}
          </InputAdornment>
        ),
        sx: {
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // Removes the border
          },
          height: "30px",
          color: "#FFFFFF", // Set the input text color to white
          "& .MuiInputBase-input": {
            color: "#FFFFFF", // Ensure the text inside the input is white
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#FFFFFF", // Set the placeholder text color to white
          },
        },
      }}
    />
  );
};

export default SearchBar;
