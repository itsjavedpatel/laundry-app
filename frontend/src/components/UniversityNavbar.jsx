import React, { useState } from "react";
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
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="px-4 md:px-6 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Shirt className="w-6 h-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">E-Dhobi</span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="#"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help & Support</span>
          </a>

          <div className="relative group">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <span>Services</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Student
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Laundry & Delivery
                </a>
              </div>
            </div>
          </div>

          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Bell className="w-6 h-6" />
          </button>

          <div className="relative group">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Privacy & Security
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Payment & Subscription
                </a>
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
          <a href="#" className="block text-gray-600 hover:text-gray-900">
            Student
          </a>
          <a href="#" className="block text-gray-600 hover:text-gray-900">
            Laundry & Delivery
          </a>
          <a href="#" className="block text-gray-600 hover:text-gray-900">
            Edit Profile
          </a>
          <a href="#" className="block text-gray-600 hover:text-gray-900">
            Privacy & Security
          </a>
          <a href="#" className="block text-gray-600 hover:text-gray-900">
            Payment & Subscription
          </a>
          <a href="#" className="block text-red-600 hover:text-red-800">
            Logout
          </a>
        </div>
      )}
    </nav>
  );
}
