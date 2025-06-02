import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Post from "../components/Post";
import api from "../api/api";
import { currentUser } from "../store/atoms";
import { useAtom } from "jotai";
import { Posts, PostsPages } from "../types/types";
import useSiteTitle from "../utils/title";
import { Link, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";

function Home() {
  const [activeTab, setActiveTab] = useState<string>("tab 1");
  const [cuurUser, setCurrentUser] = useAtom(currentUser);
  // const [postPages, setPostsPages] = useState<PostsPages>();
  const [followPosts, setFollowPosts] = useState<Posts[] | undefined>();
  const { ref, inView } = useInView();
  const location = useLocation();

  useSiteTitle("Home | The Rogue Road");

  useEffect(() => {
    async function getCurrentUserInfo() {
      try {
        const { data } = await api.get(`/user`);
        setCurrentUser(data);
        // console.log(data);
      } catch (error) {
        // console.log(error);
      }
    }
    getCurrentUserInfo();
    // console.log(followPosts);
  }, []);

  async function getAllPostsQuery({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<PostsPages> {
    const { data } = await api.get(
      `/posts?pageNumber=${pageParam}&pageSize=10`
    );
    // console.log(data);
    return data;
  }

  const { data, error, status, fetchNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: getAllPostsQuery,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.pageNumber + 1,
      staleTime: 0,
      refetchOnMount: true,
    });

  useEffect(() => {
    if (inView) {
    }
    fetchNextPage();
  }, [inView, fetchNextPage]);

  useEffect(() => {
    refetch();
  }, [location.pathname]);

  // console.log(data);
  // const content = data?.pages.map((posts) =>
  //   posts.content.map((p) => (
  //     <Post
  //       key={p.postId}
  //       postId={p.postId}
  //       userName={p.userName}
  //       title={p.title}
  //       comments={p.comments}
  //       displayName={p.displayName}
  //       profilePic={p.profilePic}
  //       postImg={p.postImg}
  //       saves={p.saves}
  //       content={p.content}
  //       likes={p.likes}
  //       createdAt={p.createdAt}
  //     />
  //   ))
  // );
  // const content = data?.pages.map((posts) => console.log(posts));

  // useEffect(() => {
  //   async function getAllPosts() {
  //     try {
  //       const { data } = await api.get(`/posts`);
  //       setPostsPages(data);
  // console.log(data);
  //     } catch (error) {
  // console.log(error);
  //     }
  //   }
  //   getAllPosts();
  // }, []);

  useEffect(() => {
    async function getFollowing() {
      try {
        const { data } = await api.get(`/user/following`);
        // console.log(data);

        const stuffs = [];
        const newStuffs: Posts[] = [];

        for (const thing of data) {
          stuffs.push(thing?.userPosts);
        }
        // console.log(stuffs);

        stuffs.forEach((e) => {
          for (let i = 0; i < e.length; i++) {
            newStuffs.push(e[i]);
          }
        });

        // console.log(newStuffs);

        const sortedStuffs = [...newStuffs].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        // console.log(sortedStuffs);
        setFollowPosts(sortedStuffs);
      } catch (error) {
        // console.log(error);
        toast.error(`${error}`);
      }
    }
    getFollowing();
  }, []);

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);
  }
  // console.log(followPosts);

  return (
    <div className="h-screen overflow-y-auto w-full flex-1 text-[#eeeeee] bg-[#141414] relative">
      <div className="container mx-auto w-max mt-7 md:mt-10 flex flex-col gap-5">
        <div role="tablist" className="tabs tabs-border mb-2 md:mb-5">
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

        {activeTab == "tab 1" && (
          <div className="flex flex-col gap-7">
            {status === "pending" ? (
              <span className="loading loading-spinner loading-md m-auto mt-50"></span>
            ) : status === "error" ? (
              <div>Error: {error.message}</div>
            ) : (
              data?.pages.map((posts) =>
                posts.content.map((p: Posts, index) => {
                  if (posts.content.length == index + 1) {
                    return (
                      <Post
                        innerRef={ref}
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
                    );
                  }
                  return (
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
                  );
                })
              )
            )}

            <div ref={ref} className="mx-auto">
              {isFetchingNextPage && (
                <span className="loading loading-spinner loading-md m-auto"></span>
              )}
            </div>
          </div>
        )}
        {/* {activeTab === "tab 1" && (
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
        )} */}
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
      {cuurUser && cuurUser.id && (
        <Link
          to={"/create"}
          className="md:hidden fixed bottom-0 right-0 ml-auto mr-5 mb-20 z-98 rounded-full shadow-white shadow-[0_0px_4px]"
        >
          <div className="bg-[#8956FB] rounded-full p-1 ">
            <Plus
              size={45}
              strokeWidth={location.pathname === "/create" ? 2.5 : 2}
            />
          </div>
        </Link>
      )}
    </div>
  );
}

export default Home;
