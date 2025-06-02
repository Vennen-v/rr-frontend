import { Bell, House, MessageSquare, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { currentUser } from "../store/atoms";
import { useWebSocket } from "../ws/Ws";
import { ConversationType, Notification } from "../types/types";

function MobileNavBar() {
  const user = useAtomValue(currentUser);
  const webSocketClient = useWebSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(location);
  // console.log(location.pathname.slice(0, 23));

  async function signOut() {
    try {
      await api.post(`/auth/signout`);
      localStorage.removeItem("rrid");
      navigate("/welcome");
      toast.success("You have logged out");
      // console.log(data);
    } catch (error) {
      // console.log(error);
    }
  }

  const nonReadNotifs = notifications.filter((notif) => !notif.read).length;

  const nonReadMessages = conversations.reduce(
    (acc: number, conversation) =>
      acc +
      conversation.messages.filter(
        (m) => m.sender.id.toString() != user?.id && !m.read
      ).length,
    0
  );
  useEffect(() => {
    async function getNotifs() {
      try {
        const { data } = await api.get(`/user/notifs`);
        setNotifications(data);
        // console.log(data);
      } catch (error) {
        // console.log(error);
      }
    }
    getNotifs();
  }, [location.pathname]);

  useEffect(() => {
    async function getConversations() {
      try {
        const { data } = await api.get(`/conversations`);
        setConversations(data);
        // console.log(data);
      } catch (error) {
        // console.log(error);
      }
    }
    getConversations();
  }, []);

  // useEffect(() => {}, []);

  useEffect(() => {
    const subscription = webSocketClient?.subscribe(
      `/topic/users/${user?.id}/notifications`,
      (message) => {
        const notification = JSON.parse(message.body);
        setNotifications((prev) => {
          const index = prev.findIndex(
            (n) => n.notificationId === notification.id
          );
          if (index === -1) {
            return [notification, ...prev];
          }
          return prev.map((n) =>
            n.notificationId === notification.id ? notification : n
          );
        });
      }
    );
    return () => subscription?.unsubscribe();
  }, [user?.id, webSocketClient]);

  useEffect(() => {
    const subscription = webSocketClient?.subscribe(
      `/topic/users/${user?.id}/conversations`,
      (message) => {
        const conversation = JSON.parse(message.body);
        setConversations((prev) => {
          const index = prev.findIndex(
            (c) => c.conversationId === conversation.conversationId
          );
          if (index === -1) {
            return [conversation, ...prev];
          }
          return prev.map((c) =>
            c.conversationId === conversation.conversationId ? conversation : c
          );
        });
      }
    );
    return () => subscription?.unsubscribe();
  }, [user?.id, webSocketClient, location.pathname]);

  return (
    <ul className="flex-1 max-h-15 menu menu-horizontal w-full md:hidden lg:hidden bg-[#141414] border-t border-t-[#2f3336]">
      <div
        className={`flex items-center ${
          user && user.id ? "justify-between" : "justify-around"
        } gap-1 w-full`}
      >
        <li>
          <Link to={"/"} className="tooltip" data-tip="Home">
            <House
              size={24}
              strokeWidth={location.pathname === "/" ? 2.5 : 2}
            />
          </Link>
        </li>
        <li>
          <Link to={"/search"} className="tooltip" data-tip="Search">
            <Search
              size={24}
              strokeWidth={location.pathname === "/search" ? 2.5 : 2}
            />
          </Link>
        </li>
        {user && user.id && (
          <>
            <li>
              <Link
                to={"/messages"}
                className="tooltip indicator"
                data-tip="Messages"
              >
                {nonReadMessages > 0 && location.pathname !== "/messages" && (
                  <span className="indicator-item indicator-start badge badge-primary h-5 w-5">
                    <span className="text-sm">{nonReadMessages}</span>
                  </span>
                )}
                <MessageSquare
                  size={24}
                  strokeWidth={
                    location.pathname === "/messages" ||
                    location.pathname.slice(0, 23) === "/messages/conversations"
                      ? 2.5
                      : 2
                  }
                />
              </Link>
            </li>
            <li>
              <Link
                to={"/notifications"}
                className="tooltip indicator"
                data-tip="Notifications"
              >
                {nonReadNotifs > 0 && (
                  <span className="indicator-item indicator-top badge badge-primary h-5 w-5">
                    <span className="text-sm">{nonReadNotifs}</span>
                  </span>
                )}
                <Bell
                  size={24}
                  strokeWidth={location.pathname === "/notifications" ? 2.5 : 2}
                />
              </Link>
            </li>
            <li className="w-10 h-9 dropdown dropdown-top dropdown-end">
              <img
                tabIndex={0}
                role="button"
                className="object-cover rounded-full h-full w-full p-0"
                src={user?.profilePic}
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-[#202020] border border-gray-500 rounded-box z-99 w-52 p-2 shadow-sm"
              >
                <li>
                  <Link
                    to={`/${user?.userName}`}
                    className="hover:bg-[#383838] "
                  >
                    Profile
                  </Link>

                  <Link to={"/settings"} className="hover:bg-[#383838] ">
                    Settings
                  </Link>
                  <button
                    onClick={signOut}
                    className="hover:bg-[#383838] text-red-400 text-sm font-extralight"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </li>
          </>
        )}
      </div>
    </ul>
  );
}

export default MobileNavBar;
