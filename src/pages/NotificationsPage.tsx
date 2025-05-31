import Notif from "../components/Notif";
import { useEffect, useState } from "react";
import { Notification } from "../types/types";
import api from "../api/api";
import useSiteTitle from "../utils/title";
import { useAtomValue } from "jotai";
import { currentUser } from "../store/atoms";
import { useNavigate } from "react-router-dom";

function NotificationsPage() {
  const currUser = useAtomValue(currentUser);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const navigate = useNavigate();

  useSiteTitle("Notifications | The Rogue Road");

  useEffect(() => {
    if (!currUser) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    async function getNotifs() {
      try {
        const { data } = await api.get(`/user/notifs`);
        setNotifications(data.reverse());
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getNotifs();
  }, []);

  return (
    <div className="h-screen overflow-y-auto w-full flex-1 text-gray-200 bg-[#141414]">
      <div className="flex flex-col mt-15 container w-max mx-auto gap-4">
        <div className="text-2xl mb-10">Notifications</div>
        <div className="flex flex-col gap-4 ">
          {notifications && notifications.length > 0 ? (
            notifications.map((n: Notification) => (
              <Notif
                key={n.notificationId}
                notificationId={n.notificationId}
                recipient={n.recipient}
                actor={n.actor}
                read={n.read}
                resourceId={n.resourceId}
                resourceString={n.resourceString}
                type={n.type}
                createdAt={n.createdAt}
              />
            ))
          ) : (
            <div className="mx-auto w-92 h-60 sm:w-80 md:w-135 md:h-60 text-center mt-30">
              No Notification
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
