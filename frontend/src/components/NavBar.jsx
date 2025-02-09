import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WashingMachine, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleScroll = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <WashingMachine className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                E-DHOबी - Aapka Apna Dhobi
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-[brown]"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </Link>
            <button
              onClick={() => handleScroll("about")}
              className="text-gray-600 hover:text-[brown]"
            >
              About
            </button>
            <button
              onClick={() => handleScroll("services")}
              className="text-gray-600 hover:text-[brown]"
            >
              Services
            </button>
            <button
              onClick={() => handleScroll("contact")}
              className="text-gray-600 hover:text-[brown]"
            >
              Contact
            </button>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </Link>
            <button
              onClick={() => handleScroll("about")}
              className="w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              About
            </button>
            <button
              onClick={() => handleScroll("services")}
              className="w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              Services
            </button>
            <button
              onClick={() => handleScroll("contact")}
              className="w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              Contact
            </button>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
