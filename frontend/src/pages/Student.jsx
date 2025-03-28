import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import NavBar from "../components/NavBar";

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
} from "lucide-react";

function Student() {
  const userName = "Akshay Guha";
  const laundryId = "L2134";

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white h-16 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shirt className="w-8 h-8 text-indigo-600" />
              <Link
                to="/"
                className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
              >
                E-DHOBI
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Top Section */}
      <div className="px-4 pt-24 pb-10 bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] text-gray-700">
        <div className="max-w-md mx-auto flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-md border-4 border-white/30 text-gray-600 flex items-center justify-center text-4xl font-bold shadow-xl mb-6">
            {getInitials(userName)}
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome, {userName}!</h1>
            <p className="text-gray-600 text-lg">Laundry ID: {laundryId}</p>
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
          <button className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 group hover:-translate-y-1">
            <div className="p-3 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
              <Settings className="w-7 h-7 text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Edit Profile
            </span>
          </button>
          <button className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 group hover:-translate-y-1">
            <div className="p-3 rounded-xl bg-purple-50 group-hover:bg-purple-100 transition-colors">
              <Waves className="w-7 h-7 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Wash</span>
          </button>
          <button className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 group hover:-translate-y-1">
            <div className="p-3 rounded-xl bg-pink-50 group-hover:bg-pink-100 transition-colors">
              <CreditCard className="w-7 h-7 text-pink-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Renew Subscription
            </span>
          </button>
          <button className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 group hover:-translate-y-1">
            <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
              <Package className="w-7 h-7 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Order</span>
          </button>
        </div>

        {/* Logout Button */}
        <button className="w-full py-4 px-4 bg-white border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-50 transition-colors mb-8 font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
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
          <a
            href="#"
            className="flex items-center gap-2 hover:text-indigo-600 transition-colors p-2 hover:bg-indigo-50 rounded-lg"
          >
            <Shield className="w-4 h-4" />
            Privacy Policy
          </a>
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
