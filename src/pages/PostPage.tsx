import { Bookmark, EllipsisVertical, Heart, MessageSquare } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import api from "../api/api";
import { Comments, Posts } from "../types/types";
import { currentUser } from "../store/atoms";
import { useAtomValue } from "jotai";
import Comment from "../components/comment";
import toast from "react-hot-toast";

function PostPage() {
  const { id } = useParams();
  const cuurUser = useAtomValue(currentUser);
  const naviagate = useNavigate();
  const [post, setPost] = useState<Posts>();
  const [isLiked, setIsLiked] = useState<boolean | undefined>();
  const [likeCount, setLikeCount] = useState<number | undefined>(post?.likes);
  const [isSaved, setIsSaved] = useState<boolean | undefined>();
  const [isLoading, setIsLoading] = useState<boolean | undefined>();
  const [saveCount, setSaveCount] = useState<number | undefined>(post?.saves);
  const [content, setContent] = useState<string>("");

  const commentRef = useRef<HTMLDivElement>(null);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  async function LikePost(e: any) {
    e.preventDefault();
    if (!cuurUser) {
      naviagate("/welcome");
      return;
    }

    if (!cuurUser.emailVerified) {
      toast.error("Your email must be verified to like a post");
      return;
    }

    if (isLiked == true) {
      setIsLiked(false);
      if (post?.likes === undefined) {
        return;
      }
      setLikeCount(post?.likes - 1);
      try {
        await api.delete(`/delete/like/${post?.postId}`);
        // console.log("Unliked Post");
        return;
      } catch (error) {
        // console.log(error);
      }
    } else {
      setIsLiked(true);
      if (post?.likes === undefined) {
        return;
      }
      setLikeCount(post?.likes + 1);
      try {
        await api.post(`/posts/like/${post?.postId}`);
        // console.log("Liked Post");
      } catch (error) {
        // console.log(error);
      }
    }
  }

  useEffect(() => {
    async function isPostLiked() {
      try {
        const { data } = await api.get(`/isLiked/${post?.postId}`);
        setIsLiked(data);
        // console.log(data);
      } catch (error) {
        // console.log(error);
      }
    }
    isPostLiked();
  }, [[location.pathname]]);

  useEffect(() => {
    async function isPostSaved() {
      try {
        const { data } = await api.get(`/isSaved/${post?.postId}`);
        setIsSaved(data);
        // console.log(data);
      } catch (error) {
        // console.log(error);
      }
    }
    isPostSaved();
  }, []);

  async function SavePost(e: any) {
    e.preventDefault();
    if (!cuurUser) {
      naviagate("/welcome");
      return;
    }
    if (!cuurUser.emailVerified) {
      toast.error("Your email must be verified to save a post");
      return;
    }
    if (isSaved == true) {
      setIsSaved(false);
      if (post?.saves === undefined) {
        return;
      }
      setSaveCount(post?.saves - 1);
      try {
        await api.delete(`/delete/save/${post.postId}`);
        // console.log("Removed Saved Post");
      } catch (error) {
        // console.log(error);
      }
    } else {
      setIsSaved(true);
      if (post?.saves === undefined) {
        return;
      }
      setSaveCount(post?.saves + 1);
      try {
        await api.put(`/posts/save/${post?.postId}`);
        // console.log("Saved Post");
      } catch (error) {
        // console.log(error);
      }
    }
    // }
  }

  useEffect(() => {
    fetchPostInfo();
  }, [location.pathname]);

  async function fetchPostInfo() {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/posts/${id}`);
      setPost(data);
      // console.log(data);
    } catch (error) {
      // console.log(error);
      naviagate("*");
    } finally {
      setIsLoading(false);
    }
  }

  async function DeletePost() {
    try {
      await api.delete(`/posts/user/current/${id}`);
      naviagate("/");
      toast.success("Post deleted successfully");
    } catch (error) {
      // console.log(error);
    }
  }

  async function handleCommentUpload(e: any) {
    e.preventDefault();
    if (!content) return;

    if (!cuurUser) {
      naviagate("/welcome");
      return;
    }

    if (!cuurUser.emailVerified) {
      toast.error("Your email must be verified to comment on a post");
      return;
    }

    try {
      await api.post(`/comments/posts/${id}`, { content: content });
      fetchPostInfo();
      toast.success("Comment pubished successfully");
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  const clean = DOMPurify.sanitize(`${post?.content}`);

  return (
    <div className=" flex flex-col flex-1 w-full md:w-fit h-screen mx-auto overflow-y-auto bg-[#141414]">
      {isLoading ? (
        <span className="loading loading-spinner loading-md m-auto"></span>
      ) : (
        <>
          <div className=" flex justify-between h-14 mb-8 border-b border-b-gray-500 w-full text-xl items-center text-[#eeeeee] font-semibold p-5">
            <Link
              to={`/${post?.userName}`}
              className="flex items-center gap-2 hover:underline"
            >
              <img
                className="object-cover rounded-md h-10 w-10 "
                src={post?.profilePic}
              />
              {post?.displayName}
            </Link>
            {/* {cuurUser && (
          <button className="p-3 bg-[#8956FB] text-sm rounded-lg duration-300 ease-in-out hover:bg-[#674b9b] hover:cursor-pointer">
          Follow
          </button>
          )} */}
          </div>
          <div className="container w-max mx-auto rounded-md flex flex-col h-full">
            <div className="flex flex-col gap-2 md:gap-5 h-100 w-92 sm:w-80 md:w-183 mx-auto mb-10 text-[#eeeeee]">
              <img
                className="h-full w-full md:h-full md:w-full mb-5 md:mb-auto object-cover rounded-sm "
                src={post?.postImg}
              />
              <div className="text-2xl md:text-4xl font-serif">
                {post?.title}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <img
                    className="hidden object-cover rounded-md h-8 w-8 md:block"
                    src={post?.profilePic}
                  />
                  <div className="flex flex-col">
                    <span className="hidden text-xs md:block">
                      {post?.displayName}
                    </span>

                    {/* Still NEED DATES */}

                    <div className="text-xs text-[#a8a8a8]">
                      {post?.createdAt.toString().slice(0, 10)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider mx-1 my-5"></div>

              {/* Below will be note content later but just to see the look */}
              <div
                id="postContent"
                className="mx-2 text-base/snug md:text-lg/normal"
                dangerouslySetInnerHTML={{ __html: clean }}
              >
                {/* {parse(post.content)} */}
                {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              tincidunt erat ut risus sollicitudin placerat. In hac habitasse
              platea dictumst. Duis iaculis tincidunt velit, in sagittis ipsum
              iaculis et. Mauris augue est, luctus vitae purus semper, vehicula
              hendrerit lectus. Morbi volutpat varius diam vitae volutpat.
              Maecenas egestas a mi eget malesuada. Nulla ultricies ac justo nec
              sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed non condimentum augue. In sodales ut lorem vitae faucibus.
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Donec dapibus turpis purus, vitae mattis turpis blandit sed.
              Aliquam ornare feugiat libero ac sodales. Ut id pharetra enim, at
              euismod risus.
              </p>
              <p>&nbsp;</p>
              <p>
              In sodales quam eu tellus viverra, quis mattis odio placerat. Nam
              luctus et justo eget commodo. Praesent vulputate sagittis
              facilisis. Nulla nec urna pulvinar, lacinia ex vitae, imperdiet
              nulla. Praesent at metus at mi laoreet rutrum. Vivamus sed ornare
              nisi. Quisque congue iaculis posuere. Phasellus ullamcorper purus
              id quam bibendum laoreet. Pellentesque habitant morbi tristique
              senectus et netus et malesuada fames ac turpis egestas. Phasellus
              ut lectus vel lacus sollicitudin convallis at nec metus. Proin
              velit purus, pretium at tortor vitae, egestas euismod ipsum. Nunc
              a convallis ipsum.
              </p>
              <p>&nbsp;</p>
              <p>
              Aenean convallis ac justo vel porttitor. Pellentesque vel nisl
              mauris. Proin egestas, libero nec gravida rutrum, urna nibh auctor
              nunc, eu condimentum lorem mi eu odio. Vivamus bibendum elementum
              urna, sit amet interdum justo placerat quis. Fusce quis elit
              metus. Curabitur dictum lacus eget odio rhoncus, sit amet commodo
              quam ornare. Mauris vel ante sit amet magna aliquet finibus. Duis
              leo ante, tristique a ligula non, sagittis lobortis metus.
              </p> */}
              </div>
              {/* Above will be note content later but just to see the look */}

              <div className=" flex justify-between mt-10 p-2">
                <div className="flex gap-4 md:gap-5 ">
                  <button
                    onClick={(e) => LikePost(e)}
                    className="flex gap-1 items-center text-[#a8a8a8] hover:cursor-pointer p-1 rounded-md hover:bg-[#383838]"
                  >
                    <Heart size={25} fill={isLiked ? "#CC3D5C" : "none"} />{" "}
                    <span className="text-sm md:text-base">
                      {likeCount ?? post?.likes}
                    </span>
                  </button>
                  <button className="flex gap-1 items-center text-[#a8a8a8] hover:cursor-pointer p-1 rounded-md hover:bg-[#383838]">
                    <MessageSquare size={25} />{" "}
                    <span className="text-sm md:text-base">
                      {post?.comments.length}
                    </span>
                  </button>
                  <button
                    onClick={(e) => SavePost(e)}
                    className="flex gap-1 items-center text-[#a8a8a8] hover:cursor-pointer p-1 rounded-md hover:bg-[#383838]"
                  >
                    <Bookmark size={25} fill={isSaved ? "#a8a8a8" : "none"} />{" "}
                    <span className="text-sm md:text-base">
                      {saveCount ?? post?.saves}
                    </span>
                  </button>
                </div>
                <div className="dropdown dropdown-top dropdown-end">
                  <div
                    className="p-2 duration-300 ease-in-out rounded-full hover:bg-[#8956FB] hover:cursor-pointer focus:bg-[#8956FB]"
                    tabIndex={0}
                    role="button"
                  >
                    <EllipsisVertical />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-[#202020] border border-gray-500 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    <li>
                      <a
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          toast.success("Link Copied");
                        }}
                      >
                        Copy Post Link
                      </a>
                      {cuurUser?.userName === post?.userName && (
                        <a onClick={DeletePost} className="text-red-400">
                          Delete Post
                        </a>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="divider mx-1 mt-2 mb-2"></div>
              <div id="comments" className="mb-10">
                <div className="flex flex-col">
                  <form
                    onSubmit={handleCommentUpload}
                    className="flex gap-4 my-4 "
                  >
                    {cuurUser && (
                      <img
                        className="rounded-md md:block hidden h-10 w-10 object-cover hover:cursor-pointer"
                        src={cuurUser?.profilePic}
                      />
                    )}
                    <div className="flex flex-col flex-1 gap-2">
                      <textarea
                        onChange={handleContentChange}
                        className="border rounded-lg border-gray-500 p-3  duration-500 ease-in-out focus:h-40 focus:outline-1 focus:outline-white"
                        placeholder="Leave a comment..."
                      ></textarea>
                      {content && (
                        <button
                          onClick={() => {
                            cuurUser ? handleCommentUpload : naviagate("/");
                          }}
                          type="submit"
                          className="w-20 h-10 p-1 text-sm bg-[#8956FB] rounded-lg duration-300 ease-in-out ml-auto hover:bg-[#674b9b] hover:cursor-pointer"
                        >
                          Post
                        </button>
                      )}
                    </div>
                  </form>
                  <div>
                    {post?.comments &&
                      post?.comments.map((c: Comments) => (
                        <Comment
                          key={c.commentId}
                          commentId={c.commentId}
                          content={c.content}
                          userName={c.userName}
                          displayName={c.displayName}
                          profilePic={c.profilePic}
                          replies={c.replies}
                          likes={c.likes}
                        />
                      ))}
                  </div>

                  <div
                    ref={commentRef}
                    className="text-center my-5 font-extralight"
                  >
                    End of Comments
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PostPage;
