import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import NavBar from "../components/NavBar";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🟢 Form data being sent:", formData); // Debugging log

    try {
      // Send POST request to backend
      const response = await axios.post(
        "http://localhost:3000/auth/login", // API endpoint
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      const { token, user } = response.data;
      // setUniversity(user);
      localStorage.setItem("token", token);

      toast.success("🎉 Login successful!");

      // 🏆 Redirect user based on role
      if (formData.role === "Student") {
        navigate("/student-dashboard");
      } else if (formData.role === "Admin") {
        navigate("/admin-dashboard");
      } else if (formData.role === "University") {
        navigate("/unidashboard");
      }
    } catch (error) {
      console.error("❌ Login failed:", error);

      // 🌍 Handle different types of errors
      if (error.response) {
        console.log("❌ Backend response:", error.response.data);

        // 🎯 Handle specific HTTP error codes
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 403) {
          toast.warn("🚫 Unauthorized access! Please check your role.");
        } else if (error.response.status === 404) {
          toast.info("🔍 User not found. Please check your credentials.");
        } else if (error.response.status === 500) {
          toast.error("🛑 Server error! Please try again later.");
        } else {
          toast.error(
            error.response.data.message || "An unknown error occurred."
          );
        }
      } else if (error.request) {
        console.error("❌ No response from server:", error.request);
        toast.error(
          "❌ No response from server. Check your internet connection."
        );
      } else {
        console.error("❌ Unexpected error:", error.message);
        toast.error("⚠️ An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <NavBar />
      <section className=" bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen  lg:py-0">
          <div className="text-center mb-10">
            <h1 className="text-3xl  font-bold text-black-600 mb-3">
              Welcome Back! Please log in to continue
            </h1>
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl  dark:text-gray-800">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                  >
                    Select role
                  </label>
                  <select
                    className="block w-full pl-5 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    value={formData.role}
                    onChange={handleChange}
                    name="role"
                  >
                    <option value="">-- Select Role --</option>
                    <option value="Admin">Admin</option>
                    <option value="University">University</option>
                    <option value="Student">Student</option>
                    <option value="Laundry">Laundry Agent</option>
                    <option value="Delivery">Delivery Agent</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    id="email"
                    className="block w-full pl-5 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    id="password"
                    placeholder="••••••••"
                    className="block w-full pl-5 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                  />
                </div>
                <div className="flex items-center  justify-start">
                  <span className="text-sm font-medium pl-2">
                    {" "}
                    Forgot password?
                  </span>
                  <Link
                    to="/forget-password"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 pl-2"
                  >
                    Reset Now
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
