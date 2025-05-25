import { Link } from "react-router-dom";
import { User } from "../types/types";

function UserSearch({ userName, displayName, profilePic }: User) {
  return (
    <Link
      to={`/${userName}`}
      className="flex gap-5 p-5 border-b w-full border-b-gray-500 duration-300 rounded-md hover:bg-[#383838] hover:cursor-pointer"
    >
      <img className="rounded-lg h-10 w-10 object-cover" src={profilePic} />
      <div className="flex flex-col ">
        <span className="text-base">{displayName}</span>
        <span className="text-sm text-[#a8a8a8]">@{userName}</span>
      </div>
    </Link>
  );
}

export default UserSearch;
