import { useNavigate } from "react-router-dom";
import { Notification, User } from "../types/types";
import { formatDistance } from "date-fns";
import api from "../api/api";
import { useEffect, useState } from "react";

function Notif({
  notificationId,

  actor,
  createdAt,
  type,
  resourceId,
  resourceString,
}: Notification) {
  const [user, setUser] = useState<User | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  async function fetchUserInfo() {
    try {
      const { data } = await api.get(`/user/${actor}`);
      setUser(data);
      // console.log(data);
    } catch (error) {
      // console.log(error);
    }
  }

  async function markNotifAsRead(notificationId: number) {
    // console.log("read notif");
    try {
      await api.put(`/user/notifs/${notificationId}`);
    } catch (error) {
      // console.log(error);
    }
  }
  return (
    <button
      onClick={() => {
        markNotifAsRead(notificationId);
        if (type === "LIKE" || type === "COMMENT") {
          navigate(`/posts/${resourceId}`);
        } else {
          navigate(`/${resourceString}`);
        }
      }}
      className="flex gap-5 items-center p-5 border-b h-25 w-80 md:w-150 border-b-gray-500 duration-300 rounded-t-md hover:bg-[#383838] hover:cursor-pointer"
    >
      <img
        className="rounded-lg h-10 w-10 object-cover"
        src={user?.profilePic}
      />

      <div className="flex flex-col gap-2">
        <div className="flex gap-3 items-center">
          <span className="text-base font-semibold">{user?.displayName}</span>
          {type === "LIKE" ? (
            <span className="text-sm">Liked your post</span>
          ) : type === "COMMENT" ? (
            <span className="text-sm">Commented on your post</span>
          ) : (
            <span className="text-sm">Followed you</span>
          )}
        </div>
        <div className="text-start text-xs text-[#a8a8a8]">
          {formatDistance(createdAt, new Date(), {
            addSuffix: true,
          })}
        </div>
      </div>
    </button>
  );
}

export default Notif;
