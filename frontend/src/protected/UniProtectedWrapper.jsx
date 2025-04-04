import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UniversityDataContext } from "../context/UniversityContext";

const UniProtectedWrapper = () => {
  const { university } = useContext(UniversityDataContext);
  const token = localStorage.getItem("token");
  if (token && university?.role === "university") return <Outlet />;
  else return <Navigate to="/login" />;
};

export default UniProtectedWrapper;
