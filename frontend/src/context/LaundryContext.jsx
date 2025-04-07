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
import Shimmer from "../layouts/ShimmerUi";
export const LaundryDataContext = createContext();

const LaundryContext = ({ children }) => {
  const [laundry, setLaundry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      if (!token) {
        setIsLoading(false);
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/laundry/get-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLaundry(response.data.laundryData);
    } catch (error) {
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
  if (isLoading) return <Shimmer />;
  if (!token) <Navigate to="/login" />;
  return (
    <LaundryDataContext.Provider value={{ laundry, setLaundry }}>
      {children}
    </LaundryDataContext.Provider>
  );
};

export default LaundryContext;
