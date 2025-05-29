import { Link } from "react-router-dom";
import { Comments } from "../types/types";
import { useRef } from "react";
function Comment({
  commentId,
  content,
  userName,
  displayName,
  profilePic,
  replies,
  likes,
}: Comments) {
  const commentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={commentRef}
      className="flex flex-col gap-5 py-8 px-4 border-b w-full border-b-gray-500 duration-300 text-[#eeeeee]"
    >
      <div className="flex gap-3">
        <Link to={`/${userName}`}>
          <img
            className="rounded-md h-10 w-10 object-cover hover:cursor-pointer"
            src={profilePic}
          />
        </Link>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex flex-col ">
            <Link to={`/${userName}`}>
              <span className="text-base font-semibold duration-300 hover:cursor-pointer hover:underline">
                {displayName}
              </span>
            </Link>
            <span className="text-xs text-[#a8a8a8]">@{userName}</span>
          </div>
        </div>
      </div>
      <div className="text-base">{content}</div>
    </div>
  );
}

export default Comment;
