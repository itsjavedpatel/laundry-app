import axios from "axios";
import React, {
  Children,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const LaundryDataContext = createContext();

const LaundryContext = ({ children }) => {
  const [laundry, setLaundry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      console.log("token :", token);
      if (!token) {
        setIsLoading(false);
        return;
      }
      const response = await axios.get(
        "http://localhost:3000/laundry/get-data",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLaundry(response.data.laundryData);
    } catch (error) {
      console.error("❌ Error fetching laundry data:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [setLaundry]);
  if (isLoading) return <h1>Loading....</h1>;
  if (!token) <Navigate to="/login" />;
  return (
    <LaundryDataContext.Provider value={{ laundry, setLaundry }}>
      {children}
    </LaundryDataContext.Provider>
  );
};

export default LaundryContext;
