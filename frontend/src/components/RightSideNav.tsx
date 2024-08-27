import React, { useState } from "react";

const RightSideNav = () => {
  // Define genreList as an array of strings (genres)
  const [genreList, setGenreList] = useState<string[]>([
    "Rock",
    "Pop",
    "Jazz",
    "Classical",
    "Hip-Hop",
  ]);

  return (
    <div className="p-8">
      <p className="text-2xl font-semibold">Genres</p>
      <div className="flex flex-wrap gap-4 mt-4 ml-5">
        {genreList.map((genre, index) => (
          <div key={index} className="bg-pinkBg rounded-2xl py-2 px-4">
            <p className="text-lg">{genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSideNav;
