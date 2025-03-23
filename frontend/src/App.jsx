import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Unidashboard from "./components/Unidashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UniStudents from "./components/UniStudents";
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000} // Toast auto-close time (3 seconds)
        hideProgressBar={false} // Hide progress bar
        closeOnClick={true} // Close on click
        pauseOnHover={true} // Pause on hover
        draggable={false} // Disable dragging
        style={{ marginTop: "80px" }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unidashboard" element={<Unidashboard />} />
          <Route path="/students" element={<UniStudents />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
