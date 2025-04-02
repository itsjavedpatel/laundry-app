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
import LaundryDelivery from "./components/LaundryDelivery";
import StudentContext from "./context/StudentContext";
import IsStudentWrapper from "./protected/IsStudentWrapper";
import StudentEditProfile from "./components/StudentEditProfile";
import LaundryAndDelivery from "./pages/LaundryAndDelivery";
import StudentChangePass from "./components/StudentChangePass";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000} // Toast auto-close time (3 seconds)
        hideProgressBar={false} // Hide progress bar
        closeOnClick={true} // Close on click
        pauseOnHover={true} // Pause on hover
        draggable={false} // Disable dragging
        style={{ marginTop: "80px" }}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/laundryanddelivery" element={<LaundryAndDelivery />} />
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
            <Route path="/university-dashboard" element={<Unidashboard />} />
            <Route path="/students" element={<UniStudents />} />
            <Route path="/subscription-plan" element={<PaymentAndSubs />} />
            <Route path="/uni-edit-profile" element={<UniEditProfile />} />
            <Route path="/uni-privacy" element={<UniPrivacy />} />
            <Route path="/laundry-delivery" element={<LaundryDelivery />} />
          </Route>
          <Route path="*" element={<Error />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route
            element={
              <StudentContext>
                <IsStudentWrapper />
              </StudentContext>
            }
          >
            <Route path="student-dashboard" element={<Student />} />
            <Route
              path="student-edit-profile"
              element={<StudentEditProfile />}
            />
            <Route
              path="student-password-change"
              element={<StudentChangePass />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
