import React, { useContext } from "react";
import { StudentDataContext } from "../context/StudentContext";
import { Navigate, Outlet } from "react-router-dom";

const IsStudentWrapper = () => {
  const { student, setStudent } = useContext(StudentDataContext);
  const token = localStorage.getItem("token");
  if (token && student?.role === "student") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default IsStudentWrapper;
