import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const UniversityDataContext = createContext();

const UniversityContext = ({ children }) => {
  const [university, setUniversity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchUniversityData = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/university/get-data`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUniversity(response.data.uniData); // ✅ Store in Context
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

    fetchUniversityData();
  }, [setUniversity]);

  // ✅ Prevent rendering until data is fetched
  if (isLoading) return <p>Loading...</p>;

  return (
    <UniversityDataContext.Provider value={{ university, setUniversity }}>
      {children}
    </UniversityDataContext.Provider>
  );
};

export default UniversityContext;
