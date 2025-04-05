import axios from "axios";
import React, { createContext, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { io } from "socket.io-client"; // ✅ Import socket.io-client
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const StudentDataContext = createContext();

const StudentContext = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const socketRef = useRef(null); // ✅ Using ref to persist socket instance
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      if (!token) {
        setIsLoading(false);
        return;
      }
      const response = await axios.get(
        "http://localhost:3000/student/get-data",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudent(response.data.student);
    } catch (error) {
      console.error("❌ Error fetching university data:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
    } finally {
      setIsLoading(false);
    }
  };
  // useEffect for fetching data
  useEffect(() => {
    fetchData();
  }, [setStudent]);
  // useEffect for socket connection
  useEffect(() => {
    if (student?._id && !socketRef.current) {
      const socket = io("http://localhost:3000", {
        transports: ["websocket"], // ✅ Force WebSocket to avoid polling issues
        withCredentials: true,
      });

      socket.on("connect", () => {
        console.log("📡 Connected to socket:", socket.id);
        socket.emit("join", { userId: student._id });
      });

      socket.on("notification", (data) => {
        console.log("🔔 Notification received:", data);
        toast.info(data.message);
      });

      socket.on("disconnect", () => {
        console.log("🔌 Socket disconnected:", socket.id);
      });

      socketRef.current = socket;

      // Cleanup on unmount or logout
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
          console.log("💥 Cleaned up socket connection");
        }
      };
    }
  }, [student?._id]);
  if (isLoading) return <h1>Loading....</h1>;
  if (!token) <Navigate to="/login" />;
  return (
    <StudentDataContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentDataContext.Provider>
  );
};

export default StudentContext;
