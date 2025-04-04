import React, { useState } from "react";
import { Building2, Mail, MapPin, Loader2, Shield } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "../navbars/NavBar";

function ForgetPassword() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    otp: "",
  });

  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    console.log("formData:", formData);

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/forgotpass/send-otp",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("OTP sent successfuly! 🎉");
      console.log("response", response.data);
      setIsOtpSend(true);
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
        const { status, data } = error.response;
        if (status) {
          toast.error(data.message);
        } else {
          toast.error("An unexpected error occurred. ⚠️");
        }
      } else if (error.request) {
        console.error("No response from server:", error.request);
        toast.error(
          "No response from server. Check your internet connection. ❌"
        );
      } else {
        console.error("Unexpected error:", error.message);
        toast.error("An unexpected error occurred. ⚠️");
      }
    } finally {
      setIsSubmitting(false); // Always reset loading state after API call
    }
  };
  const handleVerifyOtp = async () => {
    console.log("formData in verify otp:", formData);
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/forgotpass/verify-otp",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("OTP verified successfully! 🎉");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status) toast.error(data.message);
        else toast.error("An unexpected error occurred. ⚠️");
      } else if (error.request) {
        toast.error(
          "No response from server. Check your internet connection. ❌"
        );
      } else {
        toast.error("An unexpected error occurred. ⚠️");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Reset Account Password
            </h1>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form className="space-y-6">
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
              {/* Submit Button */}
              <button
                type="button"
                onClick={handleGenerateOtp}
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Processing...
                  </>
                ) : (
                  "Generate OTP"
                )}
              </button>
              {/* OTP Input */}
              {isOtpSend && (
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Enter OTP
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Shield className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      placeholder="Enter OTP"
                      required
                    />
                  </div>
                </div>
              )}
              {isOtpSend && (
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-70 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Processing...
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </button>
              )}
              {/* Note */}
              <p className="text-sm text-gray-600 text-center mt-4">
                Password will be sent to your registered email after account
                authentication
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
