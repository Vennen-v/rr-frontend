import { useEffect, useState } from "react";
import Post from "../components/Post";
import api from "../api/api";
import { currentUser } from "../globalState/atoms";
import { useAtom } from "jotai";
import { CurrentUser, Posts, PostsPages } from "../types/types";
import { useLocation } from "react-router-dom";

function Home() {
  const [activeTab, setActiveTab] = useState<string>("tab 1");
  const [cuurUser, setCurrentUser] = useAtom(currentUser);
  const [postPages, setPostsPages] = useState<PostsPages>();
  const [followPosts, setFollowPosts] = useState<CurrentUser>();

  useEffect(() => {
    async function getCurrentUserInfo() {
      try {
        const { data } = await api.get(`/user`);
        setCurrentUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getCurrentUserInfo();
    console.log(followPosts);
  }, []);

  useEffect(() => {
    async function getAllPosts() {
      try {
        const { data } = await api.get(`/posts`);
        setPostsPages(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllPosts();
  }, []);

  useEffect(() => {
    async function getFollowing() {
      try {
        const { data } = await api.get(`/user/following`);
        setFollowPosts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getFollowing();
  }, []);

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);
  }
  console.log(followPosts?.userPosts);

  return (
    <div className="h-screen overflow-y-auto w-full flex-1 text-[#eeeeee]">
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
            {postPages &&
              postPages.content.map((p: Posts) => (
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
              ))}
          </div>
        )}
        {activeTab === "tab 2" && (
          <div className="flex flex-col gap-7">
            {followPosts &&
              followPosts?.userPosts?.map((p: Posts) => (
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
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
