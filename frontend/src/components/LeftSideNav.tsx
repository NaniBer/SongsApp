const Sidebar = () => {
  return (
    <div className="text-3xl p-24">
      <p className="font-semibold text-4xl mb-24">My Music</p>
      <div className="flex flex-col">
        <button className="">My Library</button>
        <button>Stats</button>
        <button>My Playlist</button>
      </div>
    </div>
  );
};

export default Sidebar;
