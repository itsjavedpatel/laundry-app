import React, { useState } from "react";
import { Building2, Mail, MapPin, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    universityName: "",
    email: "",
    zipCode: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData:", formData);

    // setIsSubmitting(true);
    // Simulate API call
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Registration successfull");
      console.log("response", response.data);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a status code that is not 200
        console.error("Login failed:", error.response.data);
        // const { status, data } = error.response;
        // if (status === 400) {
        //   alert("Invalid email format or missing fields.");
        // } else if (status === 403) {
        //   alert("Unauthorized access! Please check your role.");
        // } else if (status === 409) {
        //   alert("University already exists! Try logging in.");
        // } else if (status === 500) {
        //   alert("Server error! Please try again later.");
        // } else {
        //   alert(data.message || "An error occurred.");
        // }
      } else if (error.request) {
        // The request was made, but no response was received
        // console.error("No response from server:", error.request);
        alert("No response from server. Check your internet connection.");
      } else {
        // Something else happened
        // console.error("Error:", error.message);
        alert("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false); // ✅ Always reset loading state after API call
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Register Your University with E-Dhobi
          </h1>
          <p className="text-gray-600">
            Simplifying Laundry Services for Educational Institutions
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* University Name Input */}
            <div>
              <label
                htmlFor="universityName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                University Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="universityName"
                  name="universityName"
                  value={formData.universityName}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  placeholder="Enter university name"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Official Email ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  placeholder="Enter official email"
                  required
                />
              </div>
            </div>

            {/* Zip Code Input */}
            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Zip Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  placeholder="Enter zip code"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Processing...
                </>
              ) : (
                "Request a Service"
              )}
            </button>

            {/* Note */}
            <p className="text-sm text-gray-600 text-center mt-4">
              Our team will verify your university and get in touch shortly.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
