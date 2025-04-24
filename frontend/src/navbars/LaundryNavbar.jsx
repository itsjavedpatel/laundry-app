import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoutHandler from "../utils/logoutHandler";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export function LaundryNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            to="/laundry-dashboard"
            className="flex items-center gap-2 hover:text-gray-300 "
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link to="#" className="flex items-center gap-2 hover:text-gray-300 ">
            <HelpCircle className="w-4 h-4" />
            <span>Help & Support</span>
          </Link>

          <button className="p-2 text-[#dad4b8] hover:text-gray-300">
            <Bell className="w-6 h-6" />
          </button>

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
                  to="/laundry-edit-profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit Profile
                </Link>
                <Link
                  to="/laundry-password-change"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Change Password
                </Link>

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
        <div className="md:hidden bg-white shadow-md p-4 space-y-4">
          <Link
            to="/laundry-dashboard"
            className="flex items-center gap-2 hover:text-gray-300 "
          >
            <span>Home</span>
          </Link>
          <Link to="#" className="block text-gray-600 hover:text-gray-900">
            Help & Support
          </Link>

          <Link
            to="/laundry-edit-profile"
            className="block text-gray-600 hover:text-gray-900"
          >
            Edit Profile
          </Link>
          <Link
            to="/laundry-password-change"
            className="block text-gray-600 hover:text-gray-900"
          >
            Change Password
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
