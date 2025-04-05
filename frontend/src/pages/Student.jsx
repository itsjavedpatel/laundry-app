import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { StudentDataContext } from "../context/StudentContext";
import logoutHandler from "../utils/logoutHandler";
import PlaceOrder from "../components/PlaceOrder";
import OrderStatus from "../components/OrderStatus";
import RenewSubscription from "../components/RenewSubscription";

import {
  User,
  Settings,
  Waves,
  Package,
  CreditCard,
  LogOut,
  HelpCircle,
  FileText,
  Shield,
  AlertCircle,
  Shirt,
  Home,
} from "lucide-react";
import StudentNavbar from "../navbars/StudentNavbar";

function Student() {
  const { student, setStudent } = useContext(StudentDataContext);
  const { name, laundryId, studentId, status, hostel } = student;

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutHandler();
      toast.success("Logout successfully");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation Bar */}
      <StudentNavbar />

      {/* Top Section */}
      <div className="px-4 pt-32 pb-10 bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] text-gray-700">
        <div className="max-w-md mx-auto flex flex-col items-center text-center">
          <p
            className={`pb-3 ${
              status === "inactive" ? "text-red-700 ml-2 " : "hidden"
            }`}
          >
            Reactivate your services to continue using laundry services
          </p>
          <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-md border-4 border-white/30 text-gray-600 flex items-center justify-center text-4xl font-bold shadow-xl mb-6">
            {getInitials(name)}
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome, {name}</h1>
            <p className="text-gray-600 text-lg">Laundry ID: {laundryId}</p>
            <p className="text-gray-600 text-lg">Student ID: {studentId}</p>

            <p className={`text-gray-600 text-lg `}>
              Status :
              <span
                className={`${
                  status === "active"
                    ? "text-green-700 font-semibold ml-2"
                    : "text-red-700 ml-2 "
                }`}
              >
                {status}
              </span>
            </p>
          </div>
          <p className="mt-6 text-gray-600 text-lg max-w-sm">
            Manage your profile and laundry services with ease.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 -mt-6">
        {/* Main Buttons Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link
            to="/student-edit-profile"
            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 group hover:-translate-y-1"
          >
            <div className="p-3 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
              <Settings className="w-7 h-7 text-indigo-600" />
            </div>
            <div
              to="/student-edit-profile"
              className="text-sm font-medium text-gray-700"
            >
              Edit Profile
            </div>
          </Link>
          <Link
            to="/student-schedule-wash"
            className={`p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 group hover:-translate-y-1 ${
              student.status === "inactive"
                ? "pointer-events-none text-gray-400 cursor-not-allowed"
                : ""
            }`}
          >
            <div className="p-3 rounded-xl bg-purple-50 group-hover:bg-purple-100 transition-colors ">
              <Waves className="w-7 h-7 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Schedule Wash
            </span>
          </Link>
          <Link
            to="/student-renew-subscription"
            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 group hover:-translate-y-1"
          >
            <div className="p-3 rounded-xl bg-pink-50 group-hover:bg-pink-100 transition-colors">
              <CreditCard className="w-7 h-7 text-pink-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Reactivate
            </span>
          </Link>
          <Link
            to="/student-order-status"
            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 group hover:-translate-y-1"
          >
            <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
              <Package className="w-7 h-7 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Orders</span>
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-4 px-4 bg-white border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-50 transition-colors mb-8 font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 bg-white p-6 rounded-2xl shadow-lg mb-8">
          <a
            href="#"
            className="flex items-center gap-2 hover:text-indigo-600 transition-colors p-2 hover:bg-indigo-50 rounded-lg"
          >
            <FileText className="w-4 h-4" />
            Terms of Use
          </a>
          <Link
            to="/student-password-change"
            className="flex items-center gap-2 hover:text-indigo-600 transition-colors p-2 hover:bg-indigo-50 rounded-lg"
          >
            <Shield className="w-4 h-4" />
            Change Password
          </Link>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-indigo-600 transition-colors p-2 hover:bg-indigo-50 rounded-lg"
          >
            <HelpCircle className="w-4 h-4" />
            FAQs
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:text-indigo-600 transition-colors p-2 hover:bg-indigo-50 rounded-lg"
          >
            <AlertCircle className="w-4 h-4" />
            Grievance Redressal
          </a>
        </div>
      </div>
    </div>
  );
}

export default Student;
