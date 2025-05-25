import { Link, useNavigate } from "react-router-dom";
import { Notification, User } from "../types/types";
import { formatDistance } from "date-fns";
import api from "../api/api";
import { useEffect, useState } from "react";

function Notif({
  notificationId,
  recipient,
  actor,
  createdAt,
  type,
  resourceId,
  read,
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function markNotifAsRead(notificationId: number) {
    console.log("read notif");
    try {
      await api.put(`/user/notifs/${notificationId}`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button
      onClick={() => {
        markNotifAsRead(notificationId);
        navigate(`/posts/${resourceId}`);
      }}
      className="flex gap-5 items-center p-5 border-b w-160 border-b-gray-500 duration-300 rounded-t-md hover:bg-[#383838] hover:cursor-pointer"
    >
      <img
        className="rounded-lg h-10 w-10 object-cover"
        src={user?.profilePic}
      />
      <div className="flex gap-3 items-center">
        <span className="text-lg font-semibold">{user?.displayName}</span>
        {type === "LIKE" ? (
          <span>Liked your post</span>
        ) : (
          <span>Commented on your post</span>
        )}
      </div>
      <div className="ml-auto text-xs text-[#a8a8a8]">
        {formatDistance(createdAt, new Date(), {
          addSuffix: true,
        })}
      </div>
    </button>
  );
}

export default Notif;
