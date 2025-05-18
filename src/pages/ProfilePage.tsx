import { useEffect, useState } from "react";
import Post from "../components/Post";
import api from "../api/api";
import { CurrentUser, Posts, PostsPages } from "../types/types";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { currentUser } from "../globalState/atoms";

function ProfilePage() {
  const currUser = useAtomValue(currentUser);
  const { userName } = useParams();
  const [activeTab, setActiveTab] = useState<string>("tab 1");
  const [user, setUser] = useState<CurrentUser>();
  const [postPages, setPostsPages] = useState<PostsPages>();
  const location = useLocation();

  useEffect(() => {
    fetchUserInfo();
  }, [location.pathname]);

  async function fetchUserInfo() {
    try {
      const { data } = await api.get(`/user/${userName}`);
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const { data } = await api.get(`/posts/user/${user?.id}`);
        setPostsPages(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserPosts();
  }, [user]);

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);
  }
  return (
    <div className=" flex flex-col flex-1 w-fit h-screen mx-auto overflow-y-auto">
      <div className=" h-18 border-b border-b-gray-500 w-full text-center text-2xl text-[#eeeeee] font-bold p-5">
        {user?.displayName}
      </div>
      <div className="h-13 mx-auto w-full flex items-center gap-2 border-b text-[#eeeeee] border-b-gray-500">
        <div role="tablist" className="tabs tabs-border h-full m-auto">
          <button
            onClick={() => handleTabChange("tab 1")}
            role="tab"
            className={`tab ${activeTab === "tab 1" && "tab-active"}
             `}
          >
            Posts
          </button>
          <button
            onClick={() => handleTabChange("tab 2")}
            role="tab"
            className={`tab ${activeTab === "tab 2" && "tab-active"}`}
          >
            About
          </button>
        </div>
      </div>

      <div className="container w-max mx-auto rounded-md flex flex-col h-full">
        <div className="flex flex-col gap-5 h-100 w-92 sm:w-80 md:w-145 mx-auto mt-10 text-[#eeeeee]">
          <div className="flex gap-5 justify-between items-center">
            <div className="flex flex-col gap-3">
              <div className="text-lg md:text-base">@{user?.userName}</div>
              <div className=" flex gap-2  text-[#a8a8a8]">
                <span className="text-sm md:text-base">
                  {user?.followers.length} Followers
                </span>
                <span className="text-sm md:text-base">•</span>
                <span className="text-smmd:text-base">
                  {user?.userPosts.length} Posts
                </span>
              </div>
            </div>
            <img
              className="object-cover rounded-md h-22 w-22 "
              src={user?.profilePic}
            />
          </div>
          <div className="text-sm md:text-base">{user?.bio}</div>
          {currUser?.userName !== userName ? (
            <button className="w-1/4 p-2 bg-[#8956FB] rounded-lg duration-300 ease-in-out hover:bg-[#674b9b] hover:cursor-pointer">
              Follow
            </button>
          ) : (
            <Link
              to={"/settings"}
              className="w-1/5 p-1 ml-auto rounded-full border border-gray-500 duration-300 ease-in-out hover:bg-[#383838] hover:cursor-pointer text-sm text-center"
            >
              Edit Profile
            </Link>
          )}
          <div className="divider"></div>
          {activeTab === "tab 1" && (
            <div className="flex flex-col gap-4">
              {postPages ? (
                postPages?.content.map((p: Posts) => (
                  <Post
                    key={p.id}
                    id={p.id}
                    userName={p.userName}
                    title={p.title}
                    comments={p.comments}
                    displayName={p.displayName}
                    profilePic={p.profilePic}
                    postImg={p.postImg}
                    saves={p.saves}
                    content={p.content}
                    likes={p.likes}
                  />
                ))
              ) : (
                <div className="text-center">No posts yet.</div>
              )}
            </div>
          )}
          {activeTab === "tab 2" && (
            <div className="flex flex-col gap-5 w-90 md:w-145 mx-auto">
              <div className="bg-[#202020] p-3 rounded-md text-sm">
                Joined: March 2, 2025
              </div>
              <div className="flex justify-around bg-[#202020] p-3 rounded-md">
                <div className="flex flex-col gap-2 items-center">
                  <span>Total Likes</span>
                  <span>80</span>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div>Total Bookmarks</div>
                  <span>5</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
