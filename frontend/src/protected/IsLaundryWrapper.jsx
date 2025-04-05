import React, { useContext } from "react";
import { LaundryDataContext } from "../context/LaundryContext";
import { Navigate, Outlet } from "react-router-dom";

const IsLaundryWrapper = () => {
  const { laundry, setLaundry } = useContext(LaundryDataContext);
  const token = localStorage.getItem("token");
  if (token && laundry?.role === "laundry") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default IsLaundryWrapper;
