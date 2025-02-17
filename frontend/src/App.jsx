import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Unidashboard from "./components/Unidashboard";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./components/Register";
import Unidashboard from "./components/Unidashboard";
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/unidashboard" element={<Unidashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
