function UserSearch() {
  return (
    <div className="flex gap-5  p-5 border-b border-b-gray-500">
      <img
        className="rounded-2xl h-10 w-10 "
        src="https://www.catconworldwide.com/wp-content/uploads/2023/01/Luna.jpg"
      />
      <div className="flex flex-col ">
        <span className="text-base">Yoshi Vennen</span>
        <span className="text-sm text-[#a8a8a8]">@yoshi35</span>
      </div>
    </div>
  );
}

export default UserSearch;
