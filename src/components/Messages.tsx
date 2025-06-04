import { useEffect, useRef } from "react";
import api from "../api/api";
import { ConvoMessage } from "../types/types";
import { useAtomValue } from "jotai";
import { currentUser } from "../store/atoms";
import { formatDistance } from "date-fns";

const date = new Date();
date.setHours(date.getHours() + 5);

function Messages({
  messageId,
  sender,
  receiver,
  content,
  read,
  createdAt,
}: ConvoMessage) {
  const currUser = useAtomValue(currentUser);

  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, []);

  useEffect(() => {
    if (!read && currUser?.id == receiver.id.toString()) {
      readMessages();
      // console.log(read);
    }
  }, [messageId, read, receiver.id, currUser?.id]);

  async function readMessages() {
    try {
      await api.put(`/conversations/messages/${messageId}`);
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <>
      <div
        ref={messageRef}
        className={`chat ${
          sender.id.toString() == currUser?.id ? "chat-end" : "chat-start"
        } mt-auto mb-5`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={sender.profilePic} />
          </div>
        </div>
        <div className="chat-header">
          {sender.displayName}
          <time className="text-xs opacity-50">
            {" "}
            {formatDistance(createdAt, date, {
              addSuffix: true,
            })}
          </time>
        </div>
        <div
          className={`max-w-100 chat-bubble text-wrap ${
            sender.id.toString() == currUser?.id ? "bg-blue-500" : "bg-gray-700"
          } `}
        >
          {content}
        </div>
        {sender.id.toString() == currUser?.id && (
          <div className="chat-footer opacity-50">
            {!read ? "Delivered" : "Seen"}
          </div>
        )}
      </div>
      {/* Split here to see the differences */}
      {/* <div className="chat chat-end mt-auto">
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
    </>
  );
}

export default Messages;
