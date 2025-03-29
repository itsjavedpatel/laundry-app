import React, { useContext, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Search,
  Filter,
  Plus,
  Check,
  X,
  Trash2,
  FileDown,
  X as Close,
} from "lucide-react";
import { UniversityNavbar } from "./UniversityNavbar";
import { UniversityDataContext } from "../context/UniversityContext";
import AddStudent from "./AddStudent";

function UniStudents() {
  const { university } = useContext(UniversityDataContext);
  const studentList = university.students;
  const [students, setStudents] = useState(studentList);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    contact: "",
    laundryId: "",
    studentId: "",
  });

  const filteredStudents = students
    .filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.laundryId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((student) =>
      statusFilter === "all" ? true : student.status === statusFilter
    );

  const toggleStatus = async (studentId, id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/university/update-student`,{id}
        
      );
      setStudents(
        students.map((student) =>
          student.laundryId === studentId
            ? {
                ...student,
                status: student.status === "active" ? "inactive" : "active",
              }
            : student
        )
      );
      toast.success(response.data.message)
    } catch (error) {
      toast.error("Error updating student status");
      console.log("error", error);
    }
  };

  const deleteStudent = async (studentId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`http://localhost:3000/university/delete-student/${studentId}`, {headers : { Authorization : `Bearer ${token}`}})
      setStudents(students.filter((student) => student._id !== studentId));
      toast.success(response.data.message);

    } catch (error) {
      toast.error("Error deleting student");
    }
  };

  const exportToCSV = () => {
    const headers = [
      "S.No",
      "Name",
      "Contact",
      "Laundry ID",
      "Email",
      "Student ID",
      "Status",
    ];
    const csvData = filteredStudents.map((student, index) =>
      [
        index + 1,
        student.name,
        student.contact,
        student.laundryId,
        student.email,
        student.studentId,
        student.status,
      ].join(",")
    );

    const csv = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9]">
      {/* Header */}
      <UniversityNavbar />

      {/* Main Content */}
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8 py-16 ">
        {/* Search, Filter, and Export Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6  ">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name or student ID or laundry ID"
              className="pl-10 pr-4 py-2 w-full rounded-lg border bg-[#ebe7e7] border-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 ">
            <Filter className="text-gray-600 h-5 w-5" />
            <select
              className="px-4 py-2 rounded-lg border bg-[#ebe7e7] border-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FileDown className="h-5 w-5" />
              Export CSV
            </button>
          </div>
        </div>

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
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-s font-medium  uppercase tracking-wider">
                  Laundry ID
                </th>
                <th className="px-6 py-3 text-left text-s font-medium  uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-s font-medium  uppercase tracking-wider">
                  Student ID
                </th>

                <th className="px-6 py-3 text-left text-s font-medium  uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-s font-medium  uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredStudents.map((student, index) => (
                <tr key={student.laundryId} className="">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.laundryId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.studentId}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status == "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() =>
                          toggleStatus(student.laundryId, student._id)
                        }
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {student.status === "active" ? (
                          <X className="h-5 w-5" />
                        ) : (
                          <Check className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteStudent(student._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="fixed bottom-8 right-8 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          aria-label="Add new student"
        >
          <Plus className="h-6 w-6" />
        </button>

        {/* Add Student Modal */}
        {showAddModal && (
          <>
            <AddStudent setShowAddModal={setShowAddModal} />
          </>
        )}
      </main>
    </div>
  );
}

export default UniStudents;
