import { useState } from "react";
import UserSearch from "../components/UserSearch";
import { Link } from "react-router-dom";
import Post from "../components/Post";

function SearchPage() {
  const [activeTab, setActiveTab] = useState<string>("tab 1");

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);
  }
  return (
    <div className="h-screen overflow-y-auto w-full flex-1 text-gray-200">
      <div className="flex flex-col container w-max mx-auto gap-4">
        <label className="input w-92 sm:w-80 md:w-150 mt-14 bg-[#202020] ">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" />
        </label>
        <div role="tablist" className="tabs tabs-border mb-10">
          <button
            onClick={() => handleTabChange("tab 1")}
            role="tab"
            className={`tab duration-300 ${
              activeTab === "tab 1" && "tab-active"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => handleTabChange("tab 2")}
            role="tab"
            className={`tab duration-300  ${
              activeTab === "tab 2" && "tab-active"
            }`}
          >
            People
          </button>
        </div>
        {activeTab === "tab 1" && (
          <div className="flex flex-col gap-7">
            <Post />
            <Post />
          </div>
        )}
        {activeTab === "tab 2" && (
          <div className="flex flex-col gap-2">
            <Link
              to={"/profile"}
              className="flex gap-5 p-5 border-b border-b-gray-500 duration-300 rounded-md hover:bg-[#383838] hover:cursor-pointer"
            >
              <img
                className="rounded-2xl h-10 w-10 "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXgwGl5-0mC66avbg7_TzilB0lMAH4sP7iGA&s"
              />
              <div className="flex flex-col ">
                <span className="text-base">Emma S</span>
                <span className="text-sm text-[#a8a8a8]">@swardy140</span>
              </div>
            </Link>
            <UserSearch />
            <UserSearch />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
