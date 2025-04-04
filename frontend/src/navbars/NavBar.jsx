import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {
  WashingMachine,
  User,
  CircleUserRound,
  Menu,
  Shirt,
  X,
  LogIn,
} from "lucide-react";
import { FaUniversity } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Navbar = () => {
  const token = localStorage.getItem("token");
  let tokenContent;
  if(token){
     tokenContent = jwtDecode(token);
    
  }
  
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleScroll = (id) => {
    setIsOpen(false);
    if (window.location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="bg-white shadow-md border-black border-b-[1px] sticky top-0 z-50 p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <Shirt className="w-8 h-8 text-indigo-600" />
            <Link
              to="/"
              className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
            >
              E-DHOBI
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 text-lg hover:text-black hover:bg-[#94bbe9] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
              className="text-gray-700 text-lg hover:text-[#d0c3c3]"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </Link>
            <button
              onClick={() => handleScroll("about")}
              className="text-gray-700 text-lg hover:text-[#d0c3c3]"
            >
              About
            </button>
            <button
              onClick={() => handleScroll("services")}
              className="text-gray-700 text-lg hover:text-[#d0c3c3]"
            >
              Services
            </button>
            <button
              onClick={() => handleScroll("contact")}
              className="text-gray-700 text-lg hover:text-[#d0c3c3]"
            >
              Contact
            </button>
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 text-lg px-4 py-2 rounded-md hover:bg-[#94bbe9] hover:text-black hover:border-0 transition-colors "
                >
                  <Tooltip title="Login">
                    <IconButton>
                      <LogIn className="text-gray-700 text-lg" />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Link
                  to="/register"
                  className="border border-white-[1px]text-gray-700 text-lg px-4 py-2 rounded-md hover:bg-[#94bbe9] hover:text-black hover:border-0 transition-colors flex  items-center gap-2"
                >
                  <FaUniversity />
                  Register
                </Link>
              </>
            ) : (
              <Link
                to={`/${tokenContent.role}-dashboard`}
                className="text-gray-700 text-lg px-4 py-2 rounded-md hover:bg-white hover:text-black hover:border-0 transition-colors flex  items-center gap-2"
              >
                <CircleUserRound />
                Profile
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-700 text-lg hover:text-blue-600 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </Link>
            <button
              onClick={() => handleScroll("about")}
              className="w-full text-left px-3 py-2 rounded-md text-gray-700 text-lg hover:text-[#d0c3c3] "
            >
              About
            </button>
            <button
              onClick={() => handleScroll("services")}
              className="w-full text-left px-3 py-2 rounded-md text-gray-700 text-lg hover:text-blue-600 hover:bg-gray-100"
            >
              Services
            </button>
            <button
              onClick={() => handleScroll("contact")}
              className="w-full text-left px-3 py-2 rounded-md text-gray-700 text-lg hover:text-blue-600 hover:bg-gray-100"
            >
              Contact
            </button>
            {!token ? (
              <>
                {" "}
                <Link
                  to="/login"
                  className="block border border-white-1 px-3 py-2 rounded-md text-gray-700 text-lg text-center  hover:bg-[#94bbe9] hover:text-black hover:border-0 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className=" border border-white-1 px-3 py-2 rounded-md text-gray-700 text-lg text-center  hover:bg-[#94bbe9] hover:text-black hover:border-0 transition-colors flex items-center justify-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUniversity />
                  Register
                </Link>
              </>
            ) : (
              <Link
                to={`/${tokenContent.role}-dashboard`}                className=" border border-white-1 px-3 py-2 rounded-md text-gray-700 text-lg text-center  hover:bg-white hover:text-black hover:border-0 transition-colors flex items-center justify-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <CircleUserRound />
                Profile
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
