import { useState } from "react";
import UserSearch from "../components/UserSearch";
import Post from "../components/Post";
import { Posts, PostsPages, User, UserPages } from "../types/types";
import api from "../api/api";
import useSiteTitle from "../utils/title";

function SearchPage() {
  const [activeTab, setActiveTab] = useState<string>("tab 1");
  const [postPages, setPostsPages] = useState<PostsPages>();
  const [userPages, setUserPages] = useState<UserPages>();
  const [keyword, setKeyword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useSiteTitle("Search | The Rogue Road");

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);
  }

  async function searchPosts() {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/posts/search?keyword=${keyword}`);
      setPostsPages(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function searchUsers() {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/users/search?keyword=${keyword}`);
      setUserPages(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    searchUsers();
    searchPosts();
  };

  return (
    <div className="h-screen overflow-y-auto w-full flex-1 text-gray-200 bg-[#141414]">
      <div className="flex flex-col container w-max mx-auto gap-4">
        <form
          onSubmit={handleSubmit}
          className="input w-92 sm:w-80 md:w-150 mt-14 bg-[#202020] pr-0"
        >
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
          <input
            value={keyword}
            type="text"
            required
            placeholder="Search"
            onChange={(e) => setKeyword(e.target.value)}
            className="mx-3 "
          />
          <button
            type="submit"
            className="border-l border-l-gray-500 h-full text-center hidden md:block md:w-1/8 hover:cursor-pointer hover:bg-[#383838]"
          >
            Search
          </button>
        </form>
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
          <div className="flex flex-col gap-7 items-center">
            {postPages && postPages.content.length > 0 ? (
              postPages.content.map((p: Posts) => (
                <Post
                  key={p.postId}
                  postId={p.postId}
                  userName={p.userName}
                  title={p.title}
                  comments={p.comments}
                  displayName={p.displayName}
                  profilePic={p.profilePic}
                  postImg={p.postImg}
                  saves={p.saves}
                  content={p.content}
                  likes={p.likes}
                  createdAt={p.createdAt}
                />
              ))
            ) : isLoading ? (
              <span className="loading loading-spinner loading-md m-auto"></span>
            ) : postPages?.content.length == 0 ? (
              <div>No Posts Found</div>
            ) : (
              <div>Search Posts</div>
            )}
          </div>
        )}
        {activeTab === "tab 2" && (
          <div className="flex flex-col gap-2 items-center overflow-y-hidden">
            {userPages && userPages.content.length > 0 ? (
              userPages.content.map((u: User) => (
                <UserSearch
                  key={u.id}
                  id={u.id}
                  userName={u.userName}
                  email={u.email}
                  displayName={u.displayName}
                  profilePic={u.profilePic}
                  bio={u.bio}
                />
              ))
            ) : isLoading ? (
              <span className="loading loading-spinner loading-md m-auto"></span>
            ) : userPages?.content.length == 0 ? (
              <div>No Users Found</div>
            ) : (
              <div>Search People</div>
            )}
            {/* <Link
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
            <UserSearch /> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
