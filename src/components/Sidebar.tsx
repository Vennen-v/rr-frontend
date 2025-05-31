import {
  House,
  Search,
  Settings,
  Plus,
  EllipsisVertical,
  Bell,
  MessageSquare,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAtomValue } from "jotai";
import { currentUser } from "../store/atoms";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { ConversationType, Notification, User } from "../types/types";
import { useWebSocket } from "../ws/Ws";

function Sidebar() {
  const user = useAtomValue(currentUser);
  const webSocketClient = useWebSocket();
  const [followList, setFollowList] = useState<User[]>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);
  console.log(location.pathname.slice(0, 23));

  async function signOut() {
    try {
      const { data } = await api.post(`/auth/signout`);
      localStorage.removeItem("rrid");
      navigate("/welcome");
      toast.success("You have logged out");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getC() {
      try {
        const { data } = await api.get(`/check-cookie`);

        if (data == "HttpOnly cookie not found") signOut();

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getC();
  }, []);

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
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getNotifs();
  }, [location.pathname]);

  useEffect(() => {
    async function getConversations() {
      try {
        const { data } = await api.get(`/conversations`);
        setConversations(data);
        console.log(data);
      } catch (error) {
        console.log(error);
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

  useEffect(() => {
    async function getFollowing() {
      try {
        const { data } = await api.get(`/user/following`);
        setFollowList(data.reverse());
        console.log(data.reverse());
      } catch (error) {
        console.log(error);
      }
    }
    getFollowing();
  }, []);

  return (
    <div
      className={`hidden flex-initial w-17 ${
        location.pathname === "/messages" ||
        location.pathname.slice(0, 23) === "/messages/conversations"
          ? "w-17"
          : "lg:w-62"
      } h-screen border-r border-r-gray-500 mx-0 md:flex flex-col bg-[#202020] sticky top-0`}
    >
      <Link
        to={"/"}
        className={` hidden ${
          location.pathname === "/messages" ||
          location.pathname.slice(0, 23) === "/messages/conversations"
            ? ""
            : "lg:block"
        } text-gray-200 text-xl font-extralight mt-10 mb-12 ml-7 duration-100 hover:cursor-pointer hover:text-[#828282]`}
      >
        The Rogue Road
      </Link>
      <div className="w-full mx-2 ">
        <Link
          to={"/"}
          className={`flex gap-3 text-base text-gray-200 md:mt-12 ${
            location.pathname === "/messages" ||
            location.pathname.slice(0, 23) === "/messages/conversations"
              ? ""
              : "lg:mt-auto"
          } mb-3 mr-4 p-3 duration-100 rounded-r-lg ${
            location.pathname === "/"
              ? "font-semibold bg-[#383838] border-l-3 border-l-[#8956FB]"
              : ""
          } hover:border-l-3  hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer `}
        >
          <span>
            <House
              size={24}
              strokeWidth={location.pathname === "/" ? 2.5 : 2}
            />
          </span>
          <span
            className={` hidden ${
              location.pathname === "/messages" ||
              location.pathname.slice(0, 23) === "/messages/conversations"
                ? ""
                : "lg:block"
            }`}
          >
            Home
          </span>
        </Link>
        <Link
          to={"/search"}
          className={`flex gap-3 text-base text-gray-200 ${
            location.pathname === "/messages" ||
            location.pathname.slice(0, 23) === "/messages/conversations"
              ? ""
              : " lg:w-58"
          } mb-3 mr-4 p-3 duration-100 rounded-r-lg ${
            location.pathname === "/search"
              ? "font-semibold bg-[#383838] border-l-3 border-l-[#8956FB]"
              : ""
          } hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer`}
        >
          <span>
            <Search
              size={24}
              strokeWidth={location.pathname === "/search" ? 2.5 : 2}
            />
          </span>
          <span
            className={` hidden ${
              location.pathname === "/messages" ||
              location.pathname.slice(0, 23) === "/messages/conversations"
                ? ""
                : "lg:block"
            }`}
          >
            Search
          </span>
        </Link>
        {user && user.id && (
          <Link
            to={"/messages"}
            className={`flex gap-3 indicator text-base ${
              location.pathname === "/messages" ||
              location.pathname.slice(0, 23) === "/messages/conversations"
                ? ""
                : " w-58"
            } text-gray-200 mb-3 mr-4 p-3 duration-100 rounded-r-lg ${
              location.pathname === "/messages" ||
              location.pathname.slice(0, 23) === "/messages/conversations"
                ? "font-semibold bg-[#383838] border-l-3 border-l-[#8956FB]"
                : ""
            } hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer`}
          >
            {nonReadMessages > 0 && location.pathname !== "/messages" && (
              <span className="ml-2 indicator-item indicator-start badge badge-primary">
                {nonReadMessages}
              </span>
            )}
            <span>
              <MessageSquare
                size={24}
                strokeWidth={
                  location.pathname === "/messages" ||
                  location.pathname.slice(0, 23) === "/messages/conversations"
                    ? 2.5
                    : 2
                }
              />
            </span>
            <span
              className={` hidden ${
                location.pathname === "/messages" ||
                location.pathname.slice(0, 23) === "/messages/conversations"
                  ? ""
                  : "lg:block"
              }`}
            >
              Messages
            </span>
          </Link>
        )}
        {user && user.id && (
          <Link
            to={"/notifications"}
            className={`flex gap-3 indicator text-base ${
              location.pathname === "/messages" ||
              location.pathname.slice(0, 23) === "/messages/conversations"
                ? ""
                : " lg:w-58"
            } text-gray-200 mb-3 mr-4 p-3 duration-100 rounded-r-lg ${
              location.pathname === "/notifications"
                ? "font-semibold bg-[#383838] border-l-3 border-l-[#8956FB]"
                : ""
            } hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer`}
          >
            {nonReadNotifs > 0 && (
              <span className="ml-2 indicator-item indicator-start badge badge-primary">
                {nonReadNotifs}
              </span>
            )}
            <span>
              <Bell
                size={24}
                strokeWidth={location.pathname === "/notifications" ? 2.5 : 2}
              />
            </span>
            <span
              className={` hidden ${
                location.pathname === "/messages" ||
                location.pathname.slice(0, 23) === "/messages/conversations"
                  ? ""
                  : "lg:block"
              }`}
            >
              Notifications
            </span>
          </Link>
        )}
        {user && user.id && (
          <Link
            to={"/settings"}
            className={`flex gap-3 text-base text-gray-200 mb-3 mr-4 p-3 duration-100 rounded-r-lg ${
              location.pathname === "/settings"
                ? "font-semibold bg-[#383838] border-l-3 border-l-[#8956FB]"
                : ""
            } hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer`}
          >
            <span>
              <Settings
                size={24}
                strokeWidth={location.pathname === "/settings" ? 2.5 : 2}
              />
            </span>
            <span
              className={` hidden ${
                location.pathname === "/messages" ||
                location.pathname.slice(0, 23) === "/messages/conversations"
                  ? ""
                  : "lg:block"
              }`}
            >
              Settings
            </span>
          </Link>
        )}

        {user && user.id && (
          <Link
            to={"/create"}
            className={`flex items-center gap-3 text-base text-gray-200 mr-4 p-3 duration-100 rounded-r-lg ${
              location.pathname === "/create"
                ? "font-semibold bg-[#383838] border-l-3 border-l-[#8956FB]"
                : ""
            } hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer`}
          >
            <span className="bg-[#8956FB] rounded-md p-1">
              <Plus
                size={18}
                strokeWidth={location.pathname === "/create" ? 2.5 : 2}
              />
            </span>
            <span
              className={` hidden ${
                location.pathname === "/messages" ||
                location.pathname.slice(0, 23) === "/messages/conversations"
                  ? ""
                  : "lg:block"
              }`}
            >
              Create
            </span>
          </Link>
        )}
      </div>

      <div>
        <div
          className={`divider  ${
            location.pathname === "/messages" ||
            location.pathname.slice(0, 23) === "/messages/conversations"
              ? ""
              : "lg:hidden"
          } `}
        ></div>
        <div
          className={` hidden mx-5 my-5 text-sm text-[#d6d5d5] ${
            location.pathname === "/messages" ||
            location.pathname.slice(0, 23) === "/messages/conversations"
              ? ""
              : "lg:block"
          }`}
        >
          Following
        </div>
        <div className="mx-2 flex flex-col gap-2 h-full overflow-y-hidden">
          {followList?.map((f: User) => (
            <Link
              key={f.id}
              to={`/${f.userName}`}
              className="flex gap-3 items-center rounded-r-lg hover:border-l-3 hover:border-l-[#8956FB] hover:bg-[#383838] hover:font-semibold hover:cursor-pointer p-2"
            >
              <img
                className="rounded-lg h-7 w-7 object-cover"
                src={f.profilePic}
              />
              <div
                className={`text-sm text-[#d6d5d5]  hidden ${
                  location.pathname === "/messages" ||
                  location.pathname.slice(0, 23) === "/messages/conversations"
                    ? ""
                    : "lg:block"
                }`}
              >
                {f.displayName}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {user && user?.id ? (
        <div className=" mt-auto">
          <div
            className={`flex gap-3 items-center ${
              location.pathname === "/messages" ||
              location.pathname.slice(0, 23) === "/messages/conversations"
                ? " "
                : "lg:mx-2 lg:mb-3 lg:p-3"
            } text-gray-200  duration-300 ease-in-out  border-t border-t-gray-500 `}
          >
            <Link
              to={`/${user.userName}`}
              className={`flex items-center gap-3 rounded-lg mx-auto my-4 ${
                location.pathname === "/messages" ||
                location.pathname.slice(0, 23) === "/messages/conversations"
                  ? " "
                  : "lg:my-0 lg:p-1 lg:mx-0"
              }  hover:underline hover:cursor-pointer`}
            >
              <img
                className="rounded-lg h-10 w-10 object-cover "
                src={user?.profilePic}
              />
              <div
                className={`${
                  location.pathname === "/messages" ||
                  location.pathname.slice(0, 23) === "/messages/conversations"
                    ? " "
                    : "lg:flex"
                } flex-col hidden`}
              >
                <span className="text-xs font-semibold">
                  {user.displayName}
                </span>
                <span className="text-xs text-[#a8a8a8]">@{user.userName}</span>
              </div>
            </Link>
            <div className="dropdown dropdown-top">
              <div
                className={` hidden  ${
                  location.pathname === "/messages" ||
                  location.pathname.slice(0, 23) === "/messages/conversations"
                    ? ""
                    : "lg:block"
                } ml-auto p-2 duration-300 ease-in-out rounded-full hover:bg-[#8956FB] hover:cursor-pointer focus:bg-[#8956FB]`}
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
                  <button
                    onClick={signOut}
                    className="hover:bg-[#383838] text-red-400"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className=" mt-auto">
          <div className="flex flex-col gap-2 mx-2 mb-3 text-gray-200 p-3 border-t border-t-gray-500 ">
            <Link
              to={"/welcome"}
              className="flex gap-3 rounded-lg h-12 w-full bg-[#8956FB] duration-300 ease-in-out hover:bg-[#674b9b] hover:cursor-pointer "
            >
              <span className="text-center m-auto text-lg">Sign in | Join</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
