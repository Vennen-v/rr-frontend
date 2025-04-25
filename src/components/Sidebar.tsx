import { House, Search, Settings, Megaphone, Bookmark } from "lucide-react";
import { useState } from "react";

function Sidebar() {
  return (
    <div className="w-84 h-screen bg-[rgb(85,85,85)] shadow-lg shadow-[#333] mx-0  flex flex-col">
      <h1 className="text-gray-200 text-xl font-serif font-semibold mt-7 mb-15 ml-7">
        RogueRoad
      </h1>
      <ul className="w-full">
        <li className="flex gap-3 text-md  text-gray-200 mb-5 ml-3 rounded-lg p-3 duration-300 ease-in-out hover:bg-[#8956FB] hover:cursor-pointer">
          <House size={28} />
          Home
        </li>
        <li className="flex gap-3 text-md text-gray-200 mb-5 ml-3 rounded p-3 duration-300 ease-in-out hover:bg-[#674b9b] hover:cursor-pointer">
          <Search size={28} color="#e5e7eb" />
          Search
        </li>
        <li className="flex gap-3 text-md  text-gray-200 mb-5 ml-3 rounded p-3 duration-300 ease-in-out hover:bg-purple-500 hover:cursor-pointer">
          <Settings size={28} color="#e5e7eb" />
          Settings
        </li>
        <li className="flex gap-3 text-md text-gray-200 mb-5 ml-3 rounded p-3 duration-300 ease-in-out hover:bg-purple-500 hover:cursor-pointer">
          <Megaphone size={28} color="#e5e7eb" />
          Contact
        </li>
        <li className="flex gap-3 text-md text-gray-200 mb-5 ml-3 rounded p-3 duration-300 ease-in-out hover:bg-purple-500 hover:cursor-pointer">
          <Bookmark size={28} color="#e5e7eb" />
          Saved
        </li>
      </ul>
      <div className="mt-auto border-t-4 border-t-[#8956FB]">Profile</div>
    </div>
  );
}

export default Sidebar;
