import { useAtomValue } from "jotai";
import { useNavigate, useParams } from "react-router-dom";
import { newConvoUser } from "./MessagesPage";
import { FormEvent, useEffect, useState } from "react";
import { ConversationType, ConvoMessage, User } from "../types/types";
import api from "../api/api";
import { currentUser } from "../store/atoms";
import { useWebSocket } from "../ws/Ws";
import Messages from "../components/Messages";
import { ArrowLeft } from "lucide-react";

function ConversationPage() {
  const ws = useWebSocket();
  const currUser = useAtomValue(currentUser);
  const { id } = useParams();
  const navigate = useNavigate();
  const [newConversationUser, setNewConversationUser] = useState<User>();
  const newConvo = useAtomValue(newConvoUser);
  const [conversation, setConversation] = useState<ConversationType | null>(
    null
  );
  const [content, setContent] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(newConvo);

  useEffect(() => {
    if (id == "new" && newConvo == null) {
      navigate("/messages");
    }
  }, [id]);

  console.log(typeof id);

  useEffect(() => {
    if (id == "new") {
      async function fetchUserInfo() {
        try {
          const { data } = await api.get(`/user/${newConvo}`);
          setNewConversationUser(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchUserInfo();
    } else if (id !== "new") {
      async function getConversation() {
        try {
          const { data } = await api.get(`/conversations/${id}`);
          setConversation(data);
          console.log(data);
          console.log(data.messages);
        } catch (error) {
          console.log(error);
        }
      }
      getConversation();
    }
  }, [id, navigate]);

  useEffect(() => {
    const subscription = ws?.subscribe(
      `/topic/conversations/${conversation?.conversationId}/messages`,
      (data) => {
        const message = JSON.parse(data.body);
        console.log(message);
        setConversation((prev) => {
          if (!prev) return null;
          const index = prev.messages.findIndex(
            (m) => m.messageId === message.messageId
          );

          if (index === -1) {
            return {
              ...prev,
              messages: [...prev.messages, message],
            };
          }
          return {
            ...prev,
            messages: prev.messages.map((m) =>
              m.messageId === message.messageId ? message : m
            ),
          };
        });
      }
    );
    return () => subscription?.unsubscribe();
  }, [conversation?.conversationId, ws]);

  async function createConversation(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await api.post(`/conversations`, {
        content: content,
        receiverId: newConversationUser?.id,
      });
      (conversation: ConversationType) =>
        navigate(`/messages/conversations/${conversation?.conversationId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await api.post(`/conversations/${id}/messages`, {
        content: content,
        receiverId:
          conversation?.recipient.id == currUser?.id
            ? conversation?.author.id
            : conversation?.recipient.id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSendingMessage(e: FormEvent<HTMLFormElement>) {
    if (!content) {
      return;
    }
    if (conversation) {
      await sendMessage(e);
    } else {
      await createConversation(e);
    }
    setContent("");
  }
  const conversationUserToDisplay =
    conversation?.recipient.id == currUser?.id
      ? conversation?.author
      : conversation?.recipient;

  return (
    <div
      className={` flex flex-col flex-1 w-full max-h-full min-h-50 mx-auto bg-[#141414] relative overflow-y-clip`}
    >
      <div className="flex gap-5 lg:block h-15 border-b  border-b-gray-500 w-full text-xl text-[#eeeeee] font-bold p-5 ">
        <button onClick={() => navigate("/messages")}>
          <ArrowLeft />
        </button>
        {id == "new" && newConversationUser?.displayName}
        {id !== "new" && conversation && conversationUserToDisplay?.displayName}
      </div>
      <div className="flex flex-col h-full mx-5 md:mx-10 mt-5 mb-5 ">
        <div className="mt-auto h-full flex flex-col gap-3 overflow-y-scroll">
          <div className="mt-auto">
            {conversation?.messages.map((m: ConvoMessage) => (
              <Messages
                key={m.messageId}
                messageId={m.messageId}
                sender={m.sender}
                receiver={m.receiver}
                content={m.content}
                read={m.read}
                createdAt={m.createdAt}
              />
            ))}
          </div>
          {/* <div className="chat chat-start mt-auto">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://media.tenor.com/akJHc9Lw_JIAAAAe/harima-kenji-school-rumble.png" />
              </div>
            </div>
            <div className="chat-header">
              Harima K.
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble bg-gray-700">
              You were the Chosen One!
            </div>
          </div>
          <div className="chat chat-end mt-auto">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://cdn.britannica.com/39/226539-050-D21D7721/Portrait-of-a-cat-with-whiskers-visible.jpg"
                />
              </div>
            </div>
            <div className="chat-header">
              Yoshi Vennen
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble bg-blue-500">I hate you!</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div> */}
        </div>
        <div className="flex flex-1 h-15 my-2 items-center ">
          <div className="ml-2 md:ml-4 mt-2 mr-0">
            <img
              className="rounded-full h-12 w-12 object-cover"
              src={currUser?.profilePic}
            />
          </div>
          <form
            onSubmit={handleSendingMessage}
            className="w-9/10 h-12 ml-4 mr-auto flex items-center border border-gray-500 rounded-full"
          >
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              type="text"
              placeholder="Message..."
              className="w-full p-3 rounded-full focus:outline-1 focus:outline-white"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConversationPage;
