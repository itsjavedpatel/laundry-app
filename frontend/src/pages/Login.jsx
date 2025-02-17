import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response:", response.data);
      if (role === "Student") {
        navigate("/student-dashboard");
      } else if (role === "Admin") {
        navigate("/admin-dashboard");
      } else if (role === "University") {
        navigate("/unidashboard");
      }
    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a status code that is not 200
        // console.error("Login failed:", error.response.data);

        if (error.response.status === 400) {
          alert("Invalid email or password!"); // User entered wrong credentials
        } else if (error.response.status === 403) {
          alert("Unauthorized access!"); // Role-based restrictions
        } else if (error.response.status === 500) {
          alert("Server error! Please try again later."); // Backend crashed
        } else {
          alert(error.response.data.message); // Generic API error message
        }
      } else if (error.request) {
        // The request was made, but no response was received
        // console.error("No response from server:", error.request);
        alert("No response from server. Check your internet connection.");
      } else {
        // Something else happened
        // console.error("Error:", error.message);
        alert("An unexpected error occurred.");
      }
    }
  };
  return (
    <section className=" bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
              <div className="flex items-center justify-between">
                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div> */}
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 pl-2"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
