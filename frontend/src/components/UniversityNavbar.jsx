import React from "react";
import {
  Bell,
  ChevronDown,
  User,
  LogOut,
  Settings,
  CreditCard,
  Shirt,
  HelpCircle,
} from "lucide-react";

export function UniversityNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <Shirt className="w-6 h-6 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                E-Dhobi
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Help & Support */}
            <a
              href="#"
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden md:inline">Help & Support</span>
            </a>
            <div className="relative group">
              <button className="flex items-center gap-4 p-2 text-gray-600 hover:text-gray-900">
                <div className="w-8 h-8 rounded-full  flex items-center justify-center">
                  Services
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <div className="py-1">
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {/* <User className="w-4 h-4" /> */}
                    <span>Student</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {/* <Settings className="w-4 h-4" /> */}
                    <span>Laundry & Delivery</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Bell className="w-6 h-6" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <div className="py-1">
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Privacy & Security</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Payment & Subscription</span>
                  </a>
                  <hr className="my-1" />
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
