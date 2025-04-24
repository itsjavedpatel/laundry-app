import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoutHandler from "../utils/logoutHandler";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UniversityDataContext } from "./../context/UniversityContext";
import {
  Bell,
  ChevronDown,
  User,
  Home,
  Shirt,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";

export function UniversityNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { university } = useContext(UniversityDataContext);
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
    <nav className="bg-white border-black border-b-[1px] text-lg sticky top-0 z-50 p-4 ">
      <div className="px-4 md:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Shirt className="w-8 h-8 text-indigo-600" />
          <Link
            to="/"
            className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
          >
            E-DHOबी
          </Link>
        </div>

        <div className="hidden md:flex items-center  gap-6">
          <Link
            to="/university-dashboard"
            className="flex items-center gap-2 hover:text-gray-300 "
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            to="/help-support"
            className="flex items-center gap-2 hover:text-gray-300 "
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help & Support</span>
          </Link>

          <div className="relative group">
            <button className="flex items-center gap-2  hover:text-gray-300">
              <span>Services</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
              <div className="py-1">
                <Link
                  to="/students"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Student
                </Link>
                <Link
                  to="/Laundry-delivery"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Laundry
                </Link>
              </div>
            </div>
          </div>
          <div className="relative">
            <Link
              to="/fee-request"
              className="p-2  text-[#dad4b8] hover:text-gray-300"
            >
              <Bell className="h-6 w-6" />
              {university.requests.length > 0 && (
                <span className="absolute top-5 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {university.requests.length}
                </span>
              )}
            </Link>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-2  hover:text-gray-300">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-5 h-5 text-black" />
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
              <div className="py-1">
                <Link
                  to="/uni-edit-profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit Profile
                </Link>
                <Link
                  to="/uni-privacy"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Privacy & Security
                </Link>
                <Link
                  to="/subscription-plan"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Payment & Subscription
                </Link>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-sm p-4 space-y-2 ">
          <Link
            to="/university-dashboard"
            className="flex items-center hover:text-gray-400 hover:bg-gray-100"
          >
            <span>Home</span>
          </Link>

          <Link
            to="/fee-request"
            className="block text-gray-900  hover:text-gray-400 hover:bg-gray-100"
          >
            Notifications
          </Link>

          <Link
            to="/help-support"
            className="block hover:bg-gray-100 text-gray-900 hover:text-gray-400"
          >
            Help & Support
          </Link>
          <Link
            to="/students"
            className="block text-gray-900 hover:bg-gray-100 hover:text-gray-400"
          >
            Student
          </Link>
          <Link
            to="/Laundry-delivery"
            className="block text-gray-900 hover:bg-gray-100 hover:text-gray-400"
          >
            Laundry
          </Link>
          <Link
            to="/uni-edit-profile"
            className="block text-gray-900 hover:bg-gray-100 hover:text-gray-400"
          >
            Edit Profile
          </Link>
          <Link
            to="/uni-privacy"
            className="block text-gray-900 hover:bg-gray-100 hover:text-gray-400"
          >
            Privacy & Security
          </Link>
          <Link
            to="/subscription-plan"
            className="block text-gray-900 hover:bg-gray-100 hover:text-gray-400"
          >
            Payment & Subscription
          </Link>
          <button
            onClick={handleLogout}
            className="block text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
