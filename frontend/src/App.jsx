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
import UniversityContext from "./context/UniversityContext";
import ForgetPassword from "./components/ForgetPassword";
import LaundryDelivery from "./components/LaundryDelivery";
import StudentContext from "./context/StudentContext";
import IsStudentWrapper from "./protected/IsStudentWrapper";
import StudentEditProfile from "./components/StudentEditProfile";
import LaundryPage from "./pages/LaundryPage";
import StudentChangePass from "./components/StudentChangePass";
import RenewSubscription from "./components/RenewSubscription";
import UniProtectedWrapper from "./protected/UniProtectedWrapper";
import OrderStatus from "./components/OrderStatus";
import PlaceOrder from "./components/PlaceOrder";
import FeeRequest from "./components/FeeRequest";
import LaundryChangePassword from "./components/LaundryChangePassword";
import LaundryEditProfile from "./components/LaundryEditProfile";
import LaundryContext from "./context/LaundryContext";
import IsLaundryWrapper from "./protected/IsLaundryWrapper";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CookiesPolicy from "./components/CookiesPolicy";
import TermsOfUse from "./components/TermOfUse";
import Faq from "./components/Faq";
import GrievanceRedressal from "./components/GrievanceRedressal";
import UniHelpAndSupport from "./components/UniHelpAndSupport";
import UniFaq from "./components/UniFaq";

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/cookiespolicy" element={<CookiesPolicy />} />
          <Route path="/termofuse" element={<TermsOfUse />} />

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
            <Route path="/fee-request" element={<FeeRequest />} />
            <Route path="/help-support" element={<UniHelpAndSupport />} />
            <Route path="/uni-faq" element={<UniFaq />} />
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
            <Route path="student-schedule-wash" element={<PlaceOrder />} />
            <Route path="student-order-status" element={<OrderStatus />} />
            <Route
              path="student-renew-subscription"
              element={<RenewSubscription />}
            />
            <Route path="/termsofuse" element={<TermsOfUse />} />
            <Route path="/faq" element={<Faq />} />
            <Route
              path="/grievanceredressal"
              element={<GrievanceRedressal />}
            />
          </Route>
          <Route
            element={
              <LaundryContext>
                <IsLaundryWrapper />
              </LaundryContext>
            }
          >
            <Route
              path="/laundry-password-change"
              element={<LaundryChangePassword />}
            />
            <Route
              path="/laundry-edit-profile"
              element={<LaundryEditProfile />}
            />
            <Route path="/laundry-dashboard" element={<LaundryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
