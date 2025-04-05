import React, { useContext, useState } from "react";
import { Bell, X } from "lucide-react";
import { StudentDataContext } from "../context/StudentContext";
import { formatDistanceToNow } from "../utils/dateUtils";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentNotification = () => {
  const token = localStorage.getItem("token");
  const { student, setStudent } = useContext(StudentDataContext);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(student.notifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = async (_id) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/student/markoneasread`,
        { messageId: _id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudent(response.data.student);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);

      toast.error("Try Again later");
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/student/markallasread`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudent(response.data.student);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Try Again later");
    }
  };

  // Sort notifications by timestamp (newest first)
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-full relative"
        >
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notification Panel */}
        <div
          className={`
            fixed md:absolute
            inset-y-0 right-0 md:inset-auto
            w-full md:w-96
            md:top-12 md:right-0
            bg-white
            shadow-lg
            z-50 md:z-30
            transform transition-transform duration-300
            ${
              isOpen
                ? "translate-x-0"
                : "translate-x-full md:translate-x-0 md:scale-0 md:opacity-0"
            }
            ${isOpen ? "md:scale-100 md:opacity-100" : ""}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
              <button onClick={() => setIsOpen(false)} className="md:hidden">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto max-h-[calc(100vh-4rem)] md:max-h-96">
            {sortedNotifications.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No notifications</p>
            ) : (
              <div className="divide-y">
                {sortedNotifications.map((notification) => (
                  <div
                    key={notification._id}
                    onClick={() => markAsRead(notification._id)}
                    className={`
                      p-4 cursor-pointer hover:bg-gray-50
                      ${notification.isRead ? "bg-white" : "bg-blue-50"}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      {!notification.isRead && (
                        <span className="w-2 h-2 mt-2 rounded-full bg-blue-600 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p
                          className={`${
                            notification.isRead
                              ? "text-gray-600"
                              : "text-gray-900 font-medium"
                          }`}
                        >
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDistanceToNow(
                            new Date(notification.createdAt)
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentNotification;
