import { useState } from "react";
import Post from "../components/Post";

function Home() {
  const [activeTab, setActiveTab] = useState<string>("tab 1");

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);
  }

  return (
    <div className="h-screen overflow-y-auto w-full flex-1 scrollbar">
      <div className="container mx-auto w-max mt-14 flex flex-col gap-5 ">
        <div role="tablist" className="tabs tabs-border mb-14">
          <button
            onClick={() => handleTabChange("tab 1")}
            role="tab"
            className={`tab text-lg duration-300 ${
              activeTab === "tab 1" && "tab-active"
            } `}
          >
            Discover
          </button>
          <button
            onClick={() => handleTabChange("tab 2")}
            role="tab"
            className={`tab text-lg duration-300 ${
              activeTab === "tab 2" && "tab-active"
            }`}
          >
            Following
          </button>
        </div>
        {activeTab === "tab 1" && (
          <div className="flex flex-col gap-7">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        )}
        {activeTab === "tab 2" && (
          <div className="flex flex-col gap-7">
            <Post />
            <Post />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
