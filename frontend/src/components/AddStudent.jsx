import axios from "axios";
import { useContext, useState } from "react";
import { X as Close } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AddStudent = ({ setShowAddModal }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    studentId: "",
    laundryId: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/university/add-student",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);

      setShowAddModal(false);
    } catch (error) {
      // console.error(error);
      if (error.response) {
        // console.log("❌ Backend response:", error.response.data);
        toast.error(error.response.data.message);
      } else if (error.request) {
        // console.error("❌ No response from server:", error.request);
        toast.error(
          "❌ No response from server. Check your internet connection."
        );
      } else {
        // console.error("❌ Unexpected error:", error.message);
        toast.error("⚠️ An unexpected error occurred.");
      }
      setShowAddModal(false);
    }
  };
  return (
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
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                required
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter student name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile"
                minLength={10}
                maxLength={10}
                required
                value={formData.mobile}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Laundry ID
              </label>
              <input
                type="text"
                name="laundryId"
                required
                value={formData.laundryId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter laundry ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Student ID
              </label>
              <input
                type="text"
                name="studentId"
                required
                value={formData.studentId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter student ID"
              />
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">
                Course
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter course name"
              />
            </div> */}
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
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddStudent;
