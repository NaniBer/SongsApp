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
            <SearchIcon />
          </InputAdornment>
        ),
        sx: {
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // Removes the border
          },
          height: "48px",
        },
      }}
    />
  );
};

export default SearchBar;
