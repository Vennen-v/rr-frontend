import { useEffect, useState } from "react";
import Post from "../components/Post";
import api from "../api/api";
import { currentUser } from "../globalState/atoms";
import { useAtom } from "jotai";
import { Posts, PostsPages } from "../types/types";

function Home() {
  const [activeTab, setActiveTab] = useState<string>("tab 1");
  const [cuurUser, setCurrentUser] = useAtom(currentUser);
  const [postPages, setPostsPages] = useState<PostsPages>();
  const [followPosts, setFollowPosts] = useState<Posts[] | undefined>();

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
        console.log(data);

        const stuffs = [];

        for (const thing of data) {
          stuffs.push(thing?.userPosts[0]);
        }

        setFollowPosts(stuffs.reverse());
      } catch (error) {
        console.log(error);
      }
    }
    getFollowing();
  }, []);

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);
  }
  console.log(followPosts);

  return (
    <div className="h-screen overflow-y-auto w-full flex-1 text-[#eeeeee] bg-[#141414]">
      <div className="container mx-auto w-max mt-10 flex flex-col gap-5 ">
        <div role="tablist" className="tabs tabs-border mb-5">
          <button
            onClick={() => handleTabChange("tab 1")}
            role="tab"
            className={`tab text-base duration-300 ${
              activeTab === "tab 1" && "tab-active"
            } `}
          >
            Discover
          </button>
          {cuurUser && cuurUser.id && (
            <button
              onClick={() => handleTabChange("tab 2")}
              role="tab"
              className={`tab text-base duration-300 ${
                activeTab === "tab 2" && "tab-active"
              }`}
            >
              Following
            </button>
          )}
        </div>
        {activeTab === "tab 1" && (
          <div className="flex flex-col gap-7">
            {postPages &&
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
              ))}
          </div>
        )}
        {activeTab === "tab 2" && (
          <div className="flex flex-col gap-7">
            {followPosts &&
            followPosts.length >= 0 &&
            followPosts[0] != undefined ? (
              followPosts?.map((p: Posts) => (
                <Post
                  key={p?.postId}
                  postId={p?.postId}
                  userName={p?.userName}
                  title={p?.title}
                  comments={p?.comments}
                  displayName={p?.displayName}
                  profilePic={p?.profilePic}
                  postImg={p?.postImg}
                  saves={p?.saves}
                  content={p?.content}
                  likes={p?.likes}
                  createdAt={p?.createdAt}
                />
              ))
            ) : (
              <div className="mx-auto w-92 h-60 sm:w-80 md:w-135 md:h-60 text-center mt-30">
                No Posts Found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
