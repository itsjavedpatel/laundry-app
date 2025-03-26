import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Bell,
  ChevronDown,
  User,
  LogOut,
  Settings,
  CreditCard,
  Shirt,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";

export function UniversityNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800  border-black border-b-[1px] sticky top-0 z-50 p-4 text-white">
      <div className="px-4 md:px-6 flex items-center justify-between h-16">
        <Link to="/">
          <div className="flex items-center">
            <Shirt className="w-6 h-6 " />
            <span className="ml-2 text-xl font-bold ">E-Dhobi</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="flex items-center gap-2 hover:text-gray-300 ">
            <HelpCircle className="w-4 h-4" />
            <span>Help & Support</span>
          </a>

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
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Laundry & Delivery
                </a>
              </div>
            </div>
          </div>

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
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </a>
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
          <a href="#" className="block text-gray-600 hover:text-gray-900">
            Help & Support
          </a>
          <Link
            to="/students"
            className="block text-gray-600 hover:text-gray-900"
          >
            Student
          </Link>
          <Link href="#" className="block text-gray-600 hover:text-gray-900">
            Laundry & Delivery
          </Link>
          <Link
            to="/uni-edit-profile"
            className="block text-gray-600 hover:text-gray-900"
          >
            Edit Profile
          </Link>
          <Link
            to="/uni-privacy"
            className="block text-gray-600 hover:text-gray-900"
          >
            Privacy & Security
          </Link>
          <Link
            to="/subscription-plan"
            className="block text-gray-600 hover:text-gray-900"
          >
            Payment & Subscription
          </Link>
          <a href="#" className="block text-red-600 hover:text-red-800">
            Logout
          </a>
        </div>
      )}
    </nav>
  );
}
