import {
  House,
  Search,
  Settings,
  Megaphone,
  Bookmark,
  EllipsisVertical,
} from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-80 h-screen  shadow-lg shadow-[#333] mx-0  flex flex-col">
      <Link
        to={"/"}
        className="text-gray-200 text-xl font-normal font-extralight mt-8 mb-15 ml-7 hover:cursor-pointer"
      >
        The Rogue Road
      </Link>
      <div className="w-full">
        <div className="flex gap-3 text-md text-gray-200 mb-3 mx-2 p-3 duration-100 rounded-r-lg hover:border-l-3 hover:border-l-[#8956FB] hover:bg-zinc-900 hover:font-semibold hover:cursor-pointer">
          <span>
            <House size={24} />
          </span>
          Home
        </div>
        <div className="flex gap-3 text-md text-gray-200 mb-3 mx-2 p-3 duration-100 rounded-r-lg hover:border-l-3 hover:border-l-[#8956FB] hover:bg-zinc-900 hover:font-semibold hover:cursor-pointer">
          <span>
            <Search size={24} />
          </span>
          Search
        </div>
        <div className="flex gap-3 text-md text-gray-200 mb-3 mx-2 p-3 duration-100 rounded-r-lg hover:border-l-3 hover:border-l-[#8956FB] hover:bg-zinc-900 hover:font-semibold hover:cursor-pointer">
          <span>
            <Settings size={24} />
          </span>
          Settings
        </div>
        <div className="flex gap-3 text-md text-gray-200 mb-3 mx-2 p-3 duration-100 rounded-r-lg hover:border-l-3 hover:border-l-[#8956FB] hover:bg-zinc-900 hover:font-semibold hover:cursor-pointer">
          <span>
            <Megaphone size={24} />
          </span>
          Contact
        </div>
        <div className="flex gap-3 text-md text-gray-200 mb-3 mx-2 p-3 duration-100 rounded-r-lg hover:border-l-3 hover:border-l-[#8956FB] hover:bg-zinc-900 hover:font-semibold hover:cursor-pointer">
          <span>
            <Bookmark size={24} />
          </span>
          Saved
        </div>
      </div>

      {/* <div className="my-auto border-t-4 border-t-[#8956FB]"></div> */}
      <div className="flex gap-3 items-center mt-auto mx-2 mb-3 rounded-lg text-gray-200 p-3 duration-300 ease-in-out hover:text-[#8956FB] hover:cursor-pointer">
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
