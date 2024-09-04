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
    <div className="p-8 mb-10 mt-4">
      <p className="font-semibold text-4xl mb-8 text-gray-200 ">Genres</p>
      <div className="flex flex-wrap gap-4 mt-4 ml-5 text-gray-300">
        {genreList.map((genre, index) => (
          <div key={index} className="bg-bgColor rounded-2xl py-2 px-4">
            <p className="text-xl">{genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSideNav;
