import { House, Search, Settings, Plus, EllipsisVertical } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex-initial w-62 h-screen border-r border-r-gray-500 mx-0  flex flex-col bg-[#252525] sticky top-0">
      <Link
        to={"/"}
        className="text-gray-200 text-xl font-extralight mt-10 mb-12 ml-7 duration-100 hover:cursor-pointer hover:text-[#828282]"
      >
        The Rogue Road
      </Link>
      <div className="w-full mx-2 ">
        <Link
          to={"/"}
          className="flex gap-3 text-base text-gray-200 mb-3 mr-4 p-3 duration-100 rounded-r-lg hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer"
        >
          <span>
            <House size={24} />
          </span>
          Home
        </Link>
        <button className="flex gap-3 text-md text-gray-200 w-full mb-3 mr-4 p-3 duration-100 rounded-r-lg hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer">
          <span>
            <Search size={24} />
          </span>
          Search
        </button>
        <div className="flex gap-3 text-md text-gray-200 mb-3 mr-4 p-3 duration-100 rounded-r-lg hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer">
          <span>
            <Settings size={24} />
          </span>
          Settings
        </div>
        <div className="flex items-center gap-3 text-md text-gray-200 mb-3 mr-4 p-3 duration-100 rounded-r-lg hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer">
          <span className="bg-[#8956FB] rounded-md p-1">
            <Plus size={18} />
          </span>
          Create
        </div>
      </div>

      {/* <div className="my-auto border-t-4 border-t-[#8956FB]"></div> */}
      <div className="flex gap-3 items-center mt-auto mx-2 mb-3 text-gray-200 p-3 duration-300 ease-in-out border-t border-t-gray-500 hover:text-[#8956FB] hover:cursor-pointer">
        <img
          className="rounded-2xl h-10 w-10 border border-[#8956FB] "
          src="https://www.catconworldwide.com/wp-content/uploads/2023/01/Luna.jpg"
        />
        <div className="flex flex-col">
          <span className="text-sm">Yoshi Vennen</span>
          <span className="text-sm">@yoshi35</span>
        </div>
        <div className="ml-auto">
          <EllipsisVertical />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
