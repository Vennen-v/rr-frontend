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
  const [user, setUser] = useState<CurrentUser | undefined>();
  const [postPages, setPostsPages] = useState<PostsPages>();
  const [followCount, setFollowCount] = useState<number | undefined>(
    user?.followers.length
  );
  const [isFollowing, setIsFollowing] = useState<boolean>();
  const location = useLocation();

  useEffect(() => {
    fetchUserInfo();
  }, [location.pathname, isFollowing?.valueOf]);

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
    async function isFollowingUser() {
      try {
        const { data } = await api.get(`/isfollowing/${userName}`);
        setIsFollowing(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    isFollowingUser();
  }, []);

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

  async function FollowUser(e: any) {
    e.preventDefault();
    if (isFollowing == true) {
      setIsFollowing(false);
      setFollowCount(
        user?.followers.length == 0 ? 0 : user?.followers.length - 1
      );
      try {
        await api.post(`/user/unfollow/${user?.id}`);
        console.log("Unliked Post");
        return;
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsFollowing(true);
      setFollowCount(user?.followers.length + 1);
      try {
        await api.post(`/user/follow/${user?.id}`);
        console.log("Liked Post");
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);
  }
  return (
    <div className=" flex flex-col flex-1 w-fit h-screen mx-auto overflow-y-auto bg-[#141414]">
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
          <div className="flex flex-col gap-4 justify-between md:mx-5">
            <div className="flex gap-3 justify-between items-center w-full">
              <div>
                <div className="text-lg md:text-base">@{user?.userName}</div>
                <div className=" flex gap-2  text-[#a8a8a8]">
                  <span className="text-sm md:text-base">
                    {followCount || user?.followers.length} Followers
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

            {currUser?.userName !== userName && !isFollowing && currUser && (
              <button
                onClick={(e) => FollowUser(e)}
                className="w-1/4 p-2 bg-[#8956FB] rounded-lg duration-300 ease-in-out hover:bg-[#674b9b] hover:cursor-pointer"
              >
                Follow
              </button>
            )}

            {currUser?.userName !== userName && isFollowing && currUser && (
              <button
                onClick={(e) => FollowUser(e)}
                className="w-1/4 p-2  rounded-lg border border-gray-500 duration-300 ease-in-out hover:bg-[#383838] hover:cursor-pointer"
              >
                Following
              </button>
            )}
            {currUser?.userName == userName && (
              <Link
                to={"/settings"}
                className="w-1/3 md:w-1/5 p-1 ml-auto rounded-full border border-gray-500 duration-300 ease-in-out hover:bg-[#383838]  hover:cursor-pointer text-sm text-center"
              >
                Edit Profile
              </Link>
            )}
          </div>
          <div className="divider"></div>
          {activeTab === "tab 1" && (
            <div className="flex flex-col gap-4">
              {postPages && postPages.content.length > 0 ? (
                postPages?.content.map((p: Posts) => (
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
              ) : (
                <div className="text-center">No posts yet</div>
              )}
            </div>
          )}
          {activeTab === "tab 2" && (
            <div className="flex flex-col gap-5 w-90 md:w-140 mx-auto">
              <div className="bg-[#202020] p-3 rounded-md text-sm">
                Joined: {user?.createdAt.slice(0, 10)}
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
