import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const StudentDataContext = createContext();

const StudentContext = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
        return <Navigate to="/login" />;
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [setStudent]);

  if (isLoading) return <h1>Loading....</h1>;
  return (
    <StudentDataContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentDataContext.Provider>
  );
};

export default StudentContext;
