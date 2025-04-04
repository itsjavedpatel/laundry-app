import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { Shirt, Home, Key } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const StudentChangePass = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    // Here you would verify OTP and update password
    try {
      const response = await axios.put(
        "http://localhost:3000/student/update-password",
        { passwordForm },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      localStorage.removeItem("token");
      setPasswordForm({ oldPassword: "", newPassword: "", otp: "" });
      setOtpSent(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response) toast.error(error.response.data.message);
      else {
        toast.error("Something went wrong");
      }
      localStorage.removeItem("token");
    }
  };

  const sendOTP = async () => {
    try {
      if (passwordForm.oldPassword === passwordForm.newPassword) {
        toast.error("Old and New Password cannot be same");
        return;
      }
      if (!passwordForm.oldPassword || !passwordForm.newPassword) {
        toast.error("Please enter both old and new passwords");
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/student/update-password",
        passwordForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOtpSent(true);
      toast.success("OTP sent to your registered email");
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      else {
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] ">
      <nav className="bg-white h-16 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center  justify-between">
            <div className="flex items-center gap-2">
              <Shirt className="w-8 h-8 text-indigo-600" />
              <Link
                to="/"
                className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
              >
                E-DHOBI
              </Link>
            </div>

            <Link
              to="/student-dashboard"
              className="text-xl font-bold  text-transparent bg-clip-text"
            >
              <Home className="w-8 h-8 text-gray-600" />
            </Link>
          </div>
        </div>
      </nav>
      <div className=" translate-y-[50%]  max-w-6xl mx-auto px-4">
        <div className="space-y-6">
          {/* Password Change Section */}
          <div className="bg-white rounded-xl  shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-400 to-gray-600 px-6 py-4">
              <div className="flex items-center">
                <Key className="text-white mr-2" size={24} />
                <h2 className="text-2xl font-bold text-white">
                  Change Password
                </h2>
              </div>
            </div>

            <form onSubmit={handlePasswordChange} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.oldPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        oldPassword: e.target.value,
                      })
                    }
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter new password"
                  />
                </div>

                {otpSent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      value={passwordForm.otp}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          otp: e.target.value,
                        })
                      }
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter OTP sent to your email"
                    />
                  </div>
                )}

                <div className="flex justify-end">
                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={sendOTP}
                      className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                    >
                      Send OTP
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-green-600 text-white  font-bold px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Change Password
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentChangePass;
