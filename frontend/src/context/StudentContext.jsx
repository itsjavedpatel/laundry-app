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
        `${import.meta.env.VITE_BASE_URL}/student/get-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudent(response.data.student);
    } catch (error) {
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

  if (isLoading) return <h1>Loading....</h1>;
  if (!token) <Navigate to="/login" />;
  return (
    <StudentDataContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentDataContext.Provider>
  );
};

export default StudentContext;
