import { Heart, MessageSquare, Bookmark, EllipsisVertical } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// import { Posts } from "../types/types";
import api from "../api/api";
import { useEffect, useState } from "react";
import { formatDistance, parseISO } from "date-fns";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { currentUser } from "../store/atoms";
import { Comments } from "../types/types";
import { format } from "date-fns-tz";

interface PostsProps {
  postId: number;
  title: string;
  content: string;
  userName: string;
  saves: number;
  comments: Comments[];
  likes: number;
  profilePic: string;
  postImg: string;
  displayName: string;
  createdAt: number;
  innerRef?: React.Ref<HTMLParagraphElement>;
}

const date = new Date();
date.setHours(date.getHours() + 5);
const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss", {
  timeZone: "America/Chicago",
});

const formattedAgain = parseISO(formattedDate);

function Post({
  postId,
  title,
  displayName,
  likes,
  comments,
  saves,
  profilePic,
  postImg,
  userName,
  createdAt,
  innerRef,
}: PostsProps) {
  const cuurUser = useAtomValue(currentUser);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [likeCount, setLikeCount] = useState<number>(likes);
  const [isSaved, setIsSaved] = useState<boolean>();
  const [saveCount, setSaveCount] = useState<number>(saves);

  async function LikePost(e: any) {
    e.preventDefault();
    if (!cuurUser) {
      navigate("/welcome");
      return;
    }

    if (!cuurUser.emailVerified) {
      toast.error("Your email must be verified to like a post");
      return;
    }
    if (isLiked == true) {
      setIsLiked(false);
      setLikeCount(likeCount == 0 ? 0 : likeCount - 1);
      try {
        await api.delete(`/delete/like/${postId}`);
        // console.log("Unliked Post");
        return;
      } catch (error) {
        // console.log(error);
      }
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
      try {
        await api.post(`/posts/like/${postId}`);
        // console.log("Liked Post");
      } catch (error) {
        // console.log(error);
      }
    }
  }

  useEffect(() => {
    async function isPostLiked() {
      try {
        const { data } = await api.get(`/isLiked/${postId}`);
        setIsLiked(data);
        // console.log(data);
      } catch (error) {
        // console.log(error);
      }
    }
    isPostLiked();
  }, []);

  useEffect(() => {
    async function isPostSaved() {
      try {
        const { data } = await api.get(`/isSaved/${postId}`);
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
      navigate("/welcome");
      return;
    }
    if (!cuurUser.emailVerified) {
      toast.error("Your email must be verified to save a post");
      return;
    }
    if (isSaved == true) {
      setIsSaved(false);
      setSaveCount(saveCount == 0 ? 0 : saveCount - 1);
      try {
        await api.delete(`/delete/save/${postId}`);
        // console.log("Removed Saved Post");
      } catch (error) {
        // console.log(error);
      }
    } else {
      setIsSaved(true);
      setSaveCount(saveCount + 1);
      try {
        await api.put(`/posts/save/${postId}`);
        // console.log("Saved Post");
      } catch (error) {
        // console.log(error);
      }
    }
    // }
  }

  async function DeletePost() {
    try {
      await api.delete(`/posts/user/current/${postId}`);
      navigate("/");
      toast.success("Post deleted successfully");
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <div
      ref={innerRef}
      className="flex flex-col mx-auto w-92 h-60 sm:w-80 md:w-135 md:h-60 text-[#eeeeee] bg-[#202020] rounded-lg duration-300 hover:bg-[#303030]"
    >
      <Link
        to={`/posts/${postId}`}
        className=" flex flex-col justify-between mx-auto w-92 h-60 sm:w-80 md:w-135 md:h-60 mb-0 bg-[#202020] rounded-lg duration-300 hover:bg-[#303030] hover:cursor-pointer"
      >
        <div className="border-b border-b-gray-500 p-2 ">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${userName}`);
            }}
            className="flex gap-3 items-center hover:cursor-pointer hover:underline w-fit"
          >
            <img className="rounded-xl h-9 w-9 object-cover" src={profilePic} />

            <span className="text-sm font-semibold">{displayName}</span>
          </button>
        </div>
        <div className="flex items-center text-start px-5 pb-0 justify-between ">
          <div className="flex flex-col gap-4 flex-1">
            <div className="text-base font-extralight md:text-lg">{title}</div>
            <div className="text-sm text-[#a8a8a8]">
              {formatDistance(createdAt, formattedAgain, {
                addSuffix: true,
              })}
            </div>
          </div>
          <div className="h-16 md:h-30 rounded-md ">
            <img
              className="h-16 w-16 md:h-30 md:w-40 object-cover rounded-md  "
              src={postImg}
            />
          </div>
        </div>
        <div className="flex gap-3 pl-4 mb-2 z-9 ">
          <button
            onClick={(e) => LikePost(e)}
            className="flex gap-1 items-center text-[#a8a8a8] p-1 rounded-lg hover:cursor-pointer hover:bg-[#202020]"
          >
            <Heart size={18} fill={isLiked ? "#CC3D5C" : "none"} />{" "}
            <span className="text-sm md:text-base">{likeCount}</span>
          </button>
          <button className="flex gap-1 items-center text-[#a8a8a8] p-1 rounded-lg hover:cursor-pointer hover:bg-[#202020]">
            <MessageSquare size={18} />{" "}
            <span className="text-sm md:text-base">{comments?.length}</span>
          </button>
          <button
            onClick={(e) => SavePost(e)}
            className="flex gap-1 items-center text-[#a8a8a8] p-1 rounded-lg hover:cursor-pointer hover:bg-[#202020]"
          >
            <Bookmark size={18} fill={isSaved ? "#a8a8a8" : "none"} />{" "}
            <span className="text-sm md:text-base">{saveCount}</span>
          </button>
          {cuurUser?.userName === userName && (
            <div
              onClick={(e) => e.preventDefault()}
              className="dropdown dropdown-right dropdown-end ml-auto mr-4"
            >
              <div
                className="p-2 duration-300 ease-in-out rounded-full hover:bg-[#8956FB] hover:cursor-pointer focus:bg-[#8956FB]"
                tabIndex={0}
                role="button"
              >
                <EllipsisVertical size={18} />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-[#202020] border border-gray-500 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <button onClick={DeletePost} className="text-red-400">
                    Delete Post
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default Post;
