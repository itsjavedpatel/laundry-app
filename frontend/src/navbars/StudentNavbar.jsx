import React, { useContext } from "react";
import { Shirt, Home, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { StudentDataContext } from "./../context/StudentContext";
import StudentNotification from "../components/StudentNotification";

const StudentNavbar = () => {
  const { student } = useContext(StudentDataContext);
  const unreadMessage = student?.notifications?.filter(
    (el) => el.isRead === false
  );
  return (
    <nav className="bg-white h-18 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center  justify-between ">
          <div className="flex items-center gap-2">
            <Shirt className="w-8 h-8 text-indigo-600" />
            <Link
              to="/"
              className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
            >
              E-DHOBI
            </Link>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <StudentNotification />
            <Link
              to="/student-dashboard"
              className="text-xl font-bold  text-transparent bg-clip-text"
            >
              <Home className="w-7 h-7 text-gray-600" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
