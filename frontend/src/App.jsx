import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Unidashboard from "./components/Unidashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Student from "./pages/Student";
import Register from "./components/Register";
import Error from "./components/Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UniStudents from "./components/UniStudents";
import PaymentAndSubs from "./components/PaymentAndSubs";
import UniEditProfile from "./components/UniEditProfile";
import UniPrivacy from "./components/UniPrivacy";
import UniProtectedWrapper from "./pages/UniProtectedWrapper";
import UniversityContext from "./context/UniversityContext";
import ForgetPassword from "./components/ForgetPassword";

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

          <Route
            element={
              <UniversityContext>
                <UniProtectedWrapper />
              </UniversityContext>
            }
          >
            <Route path="/unidashboard" element={<Unidashboard />} />
            <Route path="/students" element={<UniStudents />} />
            <Route path="/subscription-plan" element={<PaymentAndSubs />} />
            <Route path="/uni-edit-profile" element={<UniEditProfile />} />
            <Route path="/uni-privacy" element={<UniPrivacy />} />
          </Route>
          <Route path="*" element={<Error />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="student-dashboard" element={<Student />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
