import { useNavigate } from "react-router-dom";
import { ConversationType, ConvoMessage } from "../types/types";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { currentUser } from "../store/atoms";
import { useWebSocket } from "../ws/Ws";
import { formatDistance } from "date-fns";
// import { format } from "date-fns-tz";

const date = new Date();
date.setHours(date.getHours() + 5);
// const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss", {
//   timeZone: "America/Chicago",
// });
// // const formattedAgain = parseISO(formattedDate);

function Conversation({
  conversationId,
  author,
  recipient,
  messages,
  conversationc,
}: ConversationType | any) {
  const [, setConversation] = useState<ConversationType>(conversationc);
  const currUser = useAtomValue(currentUser);
  const ws = useWebSocket();
  const navigate = useNavigate();

  const userToDisplay =
    recipient.id.toString() == currUser?.id ? author : recipient;

  const nonReadMessages = messages.filter(
    (message: ConvoMessage) =>
      message?.receiver.id.toString() == currUser?.id && !message.read
  ).length;
  // console.log(nonReadMessages);

  useEffect(() => {
    const subscription = ws?.subscribe(
      `/topic/conversations/${conversationId}/messages`,
      (data) => {
        const message = JSON.parse(data.body);
        setConversation((prev) => {
          const index = prev.messages.findIndex(
            (m) => m.messageId === message.messageId
          );
          if (index == -1) {
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
        return () => subscription?.unsubscribe();
      }
    );
  }, [conversationId, ws]);

  return (
    <button
      onClick={() => {
        navigate(`/messages/conversations/${conversationId}`);
      }}
      className={`flex gap-5 items-center p-5 h-20 max-w-full min-w-100 indicator duration-300 hover:bg-[#383838] hover:cursor-pointer ${
        location.pathname === `/messages/conversations/${conversationId}` &&
        "bg-[#383838]"
      }`}
    >
      {nonReadMessages > 0 && (
        <span className="indicator-item indicator-start badge badge-primary ml-4">
          {nonReadMessages}
        </span>
      )}
      <img
        className="rounded-lg h-10 w-10 object-cover"
        src={userToDisplay.profilePic}
      />

      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <span className="text-base text-start font-semibold">
            {userToDisplay.displayName}
          </span>

          <div className="ml-auto text-start text-xs text-[#a8a8a8]">
            {formatDistance(messages[messages.length - 1].createdAt, date, {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="text-sm text-start truncate mr-8 ">
          {messages[messages.length - 1]?.content}
        </div>
      </div>
    </button>
  );
}

export default Conversation;
