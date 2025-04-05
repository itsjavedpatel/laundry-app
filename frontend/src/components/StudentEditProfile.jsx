import React, { useState } from "react";
import {
  User,
  Building2,
  School,
  MapPin,
  Mail,
  CreditCard as IdCard,
  Shirt,
  Home,
  Contact,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { StudentDataContext } from "../context/StudentContext";
import { useContext } from "react";
import StudentNavbar from "./../navbars/StudentNavbar";
function StudentEditProfile() {
  const { student, setStudent } = useContext(StudentDataContext);
  const [profile, setProfile] = useState({
    name: student.name,
    email: student.email,
    laundryId: student.laundryId,
    studentId: student.studentId,
    hostel: student.hostel,
    roomNo: student.roomNo,
    university: student.university.name,
    mobileNo: student.mobile,
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      if (
        profile.name === "" &&
        profile.hostel === "" &&
        profile.roomNo === "" &&
        !profile.mobileNo
      ) {
        toast.warn("Atleast One field need to be filled");
        return;
      }
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/student/update-profile`,
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudent(response.data.updatedStudent);

      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className=" min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] text-gray-700">
      {/* Header */}
      <StudentNavbar />

      {/* Profile Form */}
      <form
        onSubmit={handleSubmit}
        className=" text-gray-700 max-w-md mx-auto mt-16 p-4 space-y-6"
      >
        {/* Editable Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <User size={18} className="mr-2" />
              Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Non-editable Fields */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Mail size={18} className="mr-2" />
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Shirt size={18} className="mr-2" />
              Laundry ID
            </label>
            <input
              type="text"
              value={profile.laundryId}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <IdCard size={18} className="mr-2" />
              Student ID
            </label>
            <input
              type="text"
              value={profile.studentId}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <School size={18} className="mr-2" />
              University
            </label>
            <input
              type="text"
              name="university"
              disabled
              value={profile.university}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-100 border rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Contact size={18} className="mr-2" />
              Mobile No
            </label>
            <input
              type="text"
              name="hostel"
              value={profile.mobileNo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Building2 size={18} className="mr-2" />
              Hostel
            </label>
            <input
              type="text"
              name="hostel"
              value={profile.hostel}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <MapPin size={18} className="mr-2" />
              Room No
            </label>
            <input
              type="text"
              name="roomNo"
              value={profile.roomNo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-lg"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default StudentEditProfile;
