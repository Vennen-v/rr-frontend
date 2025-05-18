import { Heart, MessageSquare, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Posts } from "../types/types";

function Post({
  title,
  displayName,
  likes,
  comments,
  saves,
  profilePic,
  postImg,
  userName,
}: Posts) {
  return (
    <div className="flex flex-col mx-auto w-92 h-60 sm:w-80 md:w-140 md:h-70 text-[#eeeeee] bg-[#202020] rounded-md duration-300 hover:bg-[#303030]">
      <Link
        to={`/posts`}
        className=" flex flex-col mx-auto w-92 h-60 sm:w-80 md:w-140 md:h-70 mb-0 bg-[#202020] rounded-md rounded-b-none duration-300 hover:bg-[#303030]"
      >
        <div className="border-b border-b-gray-500 p-3 ">
          <Link
            to={`/${userName}`}
            className="flex gap-3 items-center hover:underline w-fit"
          >
            <img className="rounded-xl h-9 w-9 object-cover" src={profilePic} />

            <span className="text-sm font-semibold">{displayName}</span>
          </Link>
        </div>
        <div className="flex items-center p-5 justify-between ">
          <div className="flex flex-col gap-4 flex-1">
            <div className="text-base font-extralight md:text-lg">{title}</div>
            <div className="text-sm text-[#a8a8a8]">5 days ago</div>
          </div>
          <div className="h-16 md:h-30 rounded-md ">
            <img
              className="h-16 w-16 md:h-30 md:w-40 object-cover rounded-md  "
              src={postImg}
            />
          </div>
        </div>
      </Link>
      <div className="flex gap-4 p-4 z-99">
        <button className="flex gap-1 items-center text-[#a8a8a8] p-1 rounded-lg hover:cursor-pointer hover:bg-[#202020]">
          <Heart size={18} />{" "}
          <span className="text-sm md:text-base">{likes?.length}</span>
        </button>
        <button className="flex gap-1 items-center text-[#a8a8a8] p-1 rounded-lg hover:cursor-pointer hover:bg-[#202020]">
          <MessageSquare size={18} />{" "}
          <span className="text-sm md:text-base">{comments?.length}</span>
        </button>
        <button className="flex gap-1 items-center text-[#a8a8a8] p-1 rounded-lg hover:cursor-pointer hover:bg-[#202020]">
          <Bookmark size={18} />{" "}
          <span className="text-sm md:text-base">{saves}</span>
        </button>
      </div>
    </div>
  );
}

export default Post;
