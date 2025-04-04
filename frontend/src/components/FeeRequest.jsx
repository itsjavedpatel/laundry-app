import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UniversityNavbar } from "../navbars/UniversityNavbar";
import { UniversityDataContext } from "../context/UniversityContext";

function FeeRequest() {
  const { university, setUniversity } = useContext(UniversityDataContext);
  const studentList = university.requests;
  const [students, setStudents] = useState(studentList);
  const token = localStorage.getItem("token");
  const handleAccept = async (studentId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/university/accept-request`,
        { studentId: studentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUniversity(response.data.university);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong! Try Again Later");
      }
    }
  };
  const handleReject = async (studentId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/university/reject-request`,
        { studentId: studentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUniversity(response.data.university);
      toast.warn(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else toast.error("Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9]">
      {/* Header */}
      <UniversityNavbar />

      {/* Main Content */}
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8 py-16 ">
        {/* Search, Filter, and Export Bar */}

        {/* Data Table */}
        <div className=" bg-[#ebe7e7] border-gray-900 focus:outline-none focus:ring-1 focus:ring-black rounded-lg shadow overflow-x-auto ">
          <table className="w-full table-auto rounded-sm">
            <thead className="bg-gradient-to-r from-gray-400 to-gray-600 border border-[#bfbcbc] text-[#fff] font-semibold">
              <tr>
                <th className="px-6 py-3 text-left text-s font-medium  uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-s font-medium  uppercase tracking-wider">
                  Name
                </th>

                <th className="px-6 py-3 text-left text-s font-medium  uppercase tracking-wider">
                  Receipt Number
                </th>
                <th className="px-6 py-3 text-left text-s font-medium  uppercase tracking-wider">
                  Student ID
                </th>

                <th className="px-6 py-3 text-center text-s font-medium  uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {studentList.map((student, index) => (
                <tr key={student._id} className="">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.studentName}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.receiptNumber}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.studentId}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center  gap-6">
                      <button
                        onClick={() => handleAccept(student.studentId)}
                        className="py-1 px-2 w-1/2 rounded-md  bg-green-600 text-white hover:bg-green-900 hover:scale-105"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(student.studentId)}
                        className="py-1 px-3 w-1/2 rounded-md bg-red-700 text-white hover:bg-red-800 hover:scale-105"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default FeeRequest;
