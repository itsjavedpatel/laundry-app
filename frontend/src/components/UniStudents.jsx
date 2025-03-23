import React, { useState } from "react";
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

const initialStudents = [
  {
    id: "1",
    name: "Javed",
    contact: "++91-1234567890",
    laundryId: "LD001",
    email: "john.smith@university.edu",
    studentId: "STU2024001",
    course: "Computer Science",
    status: "active",
  },
  {
    id: "2",
    name: "Akshay ",
    contact: "+91-1234567890",
    laundryId: "LD002",
    email: "emma.wilson@university.edu",
    studentId: "STU2024002",
    course: "Business Administration",
    status: "inactive",
  },
];

function UniStudents() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    contact: "",
    laundryId: "",
    studentId: "",
    course: "",
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

  const toggleStatus = (studentId) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? {
              ...student,
              status: student.status === "active" ? "inactive" : "active",
            }
          : student
      )
    );
  };

  const deleteStudent = (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((student) => student.id !== studentId));
    }
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStudentData = {
      id: Date.now().toString(),
      ...newStudent,
      status: "active",
    };
    setStudents([...students, newStudentData]);
    setNewStudent({
      name: "",
      email: "",
      contact: "",
      laundryId: "",
      studentId: "",
      course: "",
    });
    setShowAddModal(false);
  };

  const exportToCSV = () => {
    const headers = [
      "S.No",
      "Name",
      "Contact",
      "Laundry ID",
      "Email",
      "Student ID",
      "Course",
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
        student.course,
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <UniversityNavbar />

      {/* Main Content */}
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8 py-16">
        {/* Search, Filter, and Export Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name or student ID or laundry ID"
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 h-5 w-5" />
            <select
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Laundry ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.contact}
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
                    {student.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === "active"
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
                        onClick={() => toggleStatus(student.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {student.status === "active" ? (
                          <X className="h-5 w-5" />
                        ) : (
                          <Check className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteStudent(student.id)}
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
          className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Add new student"
        >
          <Plus className="h-6 w-6" />
        </button>

        {/* Add Student Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add New Student
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <Close className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleAddStudent} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={newStudent.name}
                      onChange={(e) =>
                        setNewStudent({ ...newStudent, name: e.target.value })
                      }
                      placeholder="Enter student name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={newStudent.email}
                      onChange={(e) =>
                        setNewStudent({ ...newStudent, email: e.target.value })
                      }
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={newStudent.contact}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          contact: e.target.value,
                        })
                      }
                      placeholder="Enter mobile number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Laundry ID
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={newStudent.laundryId}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          laundryId: e.target.value,
                        })
                      }
                      placeholder="Enter laundry ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Student ID
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={newStudent.studentId}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          studentId: e.target.value,
                        })
                      }
                      placeholder="Enter student ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Course
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={newStudent.course}
                      onChange={(e) =>
                        setNewStudent({ ...newStudent, course: e.target.value })
                      }
                      placeholder="Enter course name"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default UniStudents;
