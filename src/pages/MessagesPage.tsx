/* eslint-disable */

import { SquarePen } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useSiteTitle from "../utils/title";
import Conversation from "../components/Conversation";
import { useEffect, useState } from "react";
import { ConversationType, User, UserPages } from "../types/types";
import api from "../api/api";
import { atom, useAtom, useAtomValue } from "jotai";
import { useWebSocket } from "../ws/Ws";
import { currentUser } from "../store/atoms";
import toast from "react-hot-toast";

export const newConvoUser = atom<string | null>(null);

function MessagesPage() {
  const ws = useWebSocket();
  const currUser = useAtomValue(currentUser);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [activeTab, setActiveTab] = useState<string>("tab 1");
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userPages, setUserPages] = useState<UserPages>();
  const [, setNewConvo] = useAtom(newConvoUser);
  const location = useLocation();
  const navigate = useNavigate();

  useSiteTitle("Messaging | The Rogue Road");

  // console.log(location.pathname);

  useEffect(() => {
    if (!currUser) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    async function searchUsers() {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/users/search?keyword=${keyword}`);
        setUserPages(data);
        // console.log(data);
      } catch (error) {
        // console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    searchUsers();
  }, [keyword]);

  useEffect(() => {
    if (activeTab !== "tab 2") {
      return;
    }
    async function getFollowing() {
      try {
        const { data } = await api.get(`/user/following`);
        setSuggestions(data.reverse());
        // console.log(data);
      } catch (error) {
        // console.log(error);
      }
    }
    getFollowing();
  }, [activeTab]);

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

  useEffect(() => {
    const subscription = ws?.subscribe(
      `/topic/users/${currUser?.id}/conversations`,
      (message) => {
        const conversation = JSON.parse(message.body);
        // console.log(conversation);

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
  }, [currUser?.id, ws]);

  return (
    <div className=" flex flex-col md:flex-1 w-full md:w-fit max-h-full min-h-50 md:h-screen mx-auto bg-[#141414]">
      <div className="hidden lg:block h-18 border-b border-b-gray-500 w-full text-center text-2xl text-[#eeeeee] font-bold p-5 ">
        Messages
      </div>
      <div className="flex h-screen">
        <div
          className={` ${
            location.pathname === "/messages" ? "flex" : "lg:flex hidden"
          }  flex-col border-r border-r-gray-500 w-full lg:w-100 max-h-full min-h-50`}
        >
          <div className="flex w-full items-end justify-around my-5 ">
            <div
              className={` ${
                activeTab == "tab 2" && "hidden"
              } lg:flex flex-1 flex-col w-full mx-auto gap-4`}
            >
              <form
                // onSubmit={handleSubmit}
                className="input w-4/5 mx-4  bg-[#202020]"
              >
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  // value={keyword}
                  type="text"
                  required
                  placeholder="Search Messages"
                  // onChange={handleChange}
                  className={` mx-3 `}
                />
              </form>
            </div>
            <div
              className={` ${activeTab == "tab 2" && "flex lg:hidden"} 
              ${activeTab == "tab 1" && "hidden"}  
              flex-1 flex-col w-full mx-auto gap-4`}
            >
              <form
                // onSubmit={handleSubmit}
                className="input w-4/5 mx-4  bg-[#202020]"
              >
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  value={keyword}
                  type="text"
                  required
                  placeholder="Search"
                  onChange={(e) => setKeyword(e.target.value)}
                  className={` mx-3 `}
                />
              </form>
            </div>
            <button
              onClick={() => {
                if (!currUser?.emailVerified) {
                  toast.error(
                    "Your email must be verified to send any message"
                  );
                  return;
                }
                if (activeTab == "tab 1") {
                  setActiveTab("tab 2");
                } else {
                  setActiveTab("tab 1");
                }
              }}
              className="w-9 rounded-md p-1 mr-5 mb-1 hover:cursor-pointer hover:bg-[#383838]"
            >
              <SquarePen
                size={25}
                strokeWidth={location.pathname === "/create" ? 2.5 : 2}
              />
            </button>
          </div>
          <div
            className={` flex flex-col w-full border-t max-h-full min-h-50 border-t-gray-500 overflow-x-hidden overflow-y-auto relative`}
          >
            {conversations &&
              conversations.map((c) => (
                <Conversation
                  key={c.conversationId}
                  conversationId={c.conversationId}
                  author={c.author}
                  recipient={c.recipient}
                  messages={c.messages}
                  conversationc={c}
                />
              ))}
            {!conversations ||
              (conversations.length == 0 && (
                <div className="m-auto">No Messages yet</div>
              ))}
            {activeTab == "tab 2" && (
              <div
                className={`${
                  activeTab == "tab 2" && "flex lg:hidden"
                }  flex-col h-full mx-10 absolute z-80`}
              >
                <div className="h-100 w-80 bg-[#202020] rounded-2xl p-3">
                  <div className="font-semibold text-center w-full">
                    New Message
                  </div>

                  <div className="divider my-1"></div>
                  <p className="text-sm">
                    {userPages && userPages.content.length > 0
                      ? "Start new conversation"
                      : "Suggested"}
                  </p>
                  <div className="flex flex-col gap-1 items-center mt-2 overflow-y-hidden">
                    {keyword !== "" &&
                    userPages &&
                    userPages.content.length > 0 ? (
                      userPages.content.map((u: User) => (
                        <button
                          key={u.id}
                          onClick={() => {
                            const conversation = conversations.find(
                              (c) =>
                                c.recipient.id === u?.id ||
                                c.author.id === u?.id
                            );
                            if (conversation) {
                              navigate(
                                `/messages/conversations/${conversation.conversationId}`
                              );
                              setActiveTab("tab 1");
                            } else {
                              setNewConvo(u.userName);
                              navigate(`/messages/conversations/new`);
                              setActiveTab("tab 1");
                            }
                          }}
                          className="flex gap-5 p-2 border-b w-full border-b-gray-500 duration-300 rounded-t-md hover:bg-[#383838] hover:cursor-pointer"
                        >
                          <img
                            className="rounded-lg h-7 w-7 object-cover"
                            src={u.profilePic}
                          />
                          <div className="flex flex-col ">
                            <span className="text-sm">{u.displayName}</span>
                            <span className="text-sm text-[#a8a8a8]">
                              @{u.userName}
                            </span>
                          </div>
                        </button>
                      ))
                    ) : isLoading ? (
                      <div>Searching...</div>
                    ) : suggestions ? (
                      suggestions.map((s: User) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            const conversation = conversations.find(
                              (c) =>
                                c.recipient.id === s?.id ||
                                c.author.id === s?.id
                            );
                            if (conversation) {
                              navigate(
                                `/messages/conversations/${conversation.conversationId}`
                              );
                              setActiveTab("tab 1");
                            } else {
                              setNewConvo(s.userName);
                              navigate(`/messages/conversations/new`);
                              setActiveTab("tab 1");
                            }
                          }}
                          className="flex gap-5 p-2 border-b w-full border-b-gray-500 duration-300 rounded-t-md hover:bg-[#383838] hover:cursor-pointer"
                        >
                          <img
                            className="rounded-lg h-7 w-7 object-cover"
                            src={s.profilePic}
                          />
                          <div className="flex flex-col ">
                            <span className="text-sm">{s.displayName}</span>
                            <span className="text-sm text-[#a8a8a8]">
                              @{s.userName}
                            </span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div>No Users Found</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {activeTab == "tab 1" && <Outlet />}
        {location.pathname.slice(0, 23) === "/messages/conversations" ||
        activeTab == "tab 2" ? (
          ""
        ) : (
          <div className="hidden lg:flex flex-col items-center m-auto gap-1 ">
            <div className="font-semibold">No conversation selected</div>
            <div className="m-auto text-sm text-[#a8a8a8]">
              Select a conversation to view it here
            </div>
          </div>
        )}

        {activeTab == "tab 2" && (
          <div
            className={`${
              activeTab == "tab 2" && "hidden lg:flex"
            } flex flex-col flex-1 w-full h-full mx-auto bg-[#141414] relative`}
          >
            <div className="flex gap-2 items-center h-15 border-b border-b-gray-500 w-full text-xl text-[#eeeeee] font-bold p-5 ">
              <div className="text-base">To: </div>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                className="w-full text-base focus:outline-none"
                placeholder="Search people"
              />
            </div>
            <div className="flex flex-col h-full mx-10  ">
              <div className="h-130 w-115 bg-[#202020] rounded-2xl p-3">
                <div className="font-semibold text-center w-full">
                  New Message
                </div>

                <div className="divider my-1"></div>
                <p className="text-sm">
                  {userPages && userPages.content.length > 0
                    ? "Start new conversation"
                    : "Suggested"}
                </p>
                <div className="flex flex-col gap-1 items-center mt-2 overflow-y-hidden">
                  {keyword !== "" &&
                  userPages &&
                  userPages.content.length > 0 ? (
                    userPages.content.map((u: User) => (
                      <button
                        key={u.id}
                        onClick={() => {
                          const conversation = conversations.find(
                            (c) =>
                              c.recipient.id === u?.id || c.author.id === u?.id
                          );
                          if (conversation) {
                            navigate(
                              `/messages/conversations/${conversation.conversationId}`
                            );
                            setActiveTab("tab 1");
                          } else {
                            setNewConvo(u.userName);
                            navigate(`/messages/conversations/new`);
                            setActiveTab("tab 1");
                          }
                        }}
                        className="flex gap-5 p-2 border-b w-full border-b-gray-500 duration-300 rounded-t-md hover:bg-[#383838] hover:cursor-pointer"
                      >
                        <img
                          className="rounded-lg h-7 w-7 object-cover"
                          src={u.profilePic}
                        />
                        <div className="flex flex-col ">
                          <span className="text-sm">{u.displayName}</span>
                          <span className="text-sm text-[#a8a8a8]">
                            @{u.userName}
                          </span>
                        </div>
                      </button>
                    ))
                  ) : isLoading ? (
                    <div>Searching...</div>
                  ) : suggestions ? (
                    suggestions.map((s: User) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          const conversation = conversations.find(
                            (c) =>
                              c.recipient.id === s?.id || c.author.id === s?.id
                          );
                          if (conversation) {
                            navigate(
                              `/messages/conversations/${conversation.conversationId}`
                            );
                            setActiveTab("tab 1");
                          } else {
                            setNewConvo(s.userName);
                            navigate(`/messages/conversations/new`);
                            setActiveTab("tab 1");
                          }
                        }}
                        className="flex gap-5 p-2 border-b w-full border-b-gray-500 duration-300 rounded-t-md hover:bg-[#383838] hover:cursor-pointer"
                      >
                        <img
                          className="rounded-lg h-7 w-7 object-cover"
                          src={s.profilePic}
                        />
                        <div className="flex flex-col ">
                          <span className="text-sm">{s.displayName}</span>
                          <span className="text-sm text-[#a8a8a8]">
                            @{s.userName}
                          </span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div>No Users Found</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;
