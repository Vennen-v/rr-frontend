import { Link } from "react-router-dom";

function UserSearch() {
  return (
    <Link
      to={"/profile"}
      className="flex gap-5 p-5 border-b border-b-gray-500 duration-300 rounded-md hover:bg-[#383838] hover:cursor-pointer"
    >
      <img
        className="rounded-2xl h-10 w-10 "
        src="https://www.catconworldwide.com/wp-content/uploads/2023/01/Luna.jpg"
      />
      <div className="flex flex-col ">
        <span className="text-base">Yoshi Vennen</span>
        <span className="text-sm text-[#a8a8a8]">@yoshi35</span>
      </div>
    </Link>
  );
}

export default UserSearch;
