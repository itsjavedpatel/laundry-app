import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { Lock, Mail, AlertTriangle, Shield, Key } from "lucide-react";
import { UniversityNavbar } from "../navbars/UniversityNavbar";
import { useNavigate } from "react-router-dom";

const UniPrivacy = () => {
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
        "${import.meta.env.VITE_BASE_URL}/university/update-password",
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
        `${import.meta.env.VITE_BASE_URL}/university/update-password`,
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

  const requestEmailChange = () => {
    toast.success(
      "Email change request submitted. You will receive updates on your registered email."
    );
  };

  const requestAccountDeletion = () => {
    toast.success(
      "Account deletion request submitted. Our team will contact you shortly."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] ">
      <UniversityNavbar />
      <div className="mt-16 max-w-6xl mx-auto px-4">
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
                    className="block w-full px-2 py-1 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                    className="block w-full px-2 py-1 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                      className="block w-full px-2 py-1 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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

          {/* Email Settings Section */}
          <div className="bg-white rounded-xl  shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-400 to-gray-600 px-6 py-4">
              <div className="flex items-center">
                <Mail className="text-white mr-2" size={24} />
                <h2 className="text-2xl font-bold text-white">
                  Email Settings
                </h2>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Request to change your registered email address. Our team will
                verify and process your request.
              </p>
              <button
                onClick={requestEmailChange}
                className="w-full bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition-colors"
              >
                Request Email Change
              </button>
            </div>
          </div>

          {/* Danger Zone Section */}
          <div className="bg-white rounded-xl  shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-400 to-gray-600 px-6 py-4">
              <div className="flex items-center">
                <AlertTriangle className="text-white mr-2" size={24} />
                <h2 className="text-2xl font-bold text-white">Danger Zone</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="border-2 border-gray-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Shield className="text-gray-300 mr-2" size={24} />
                  <h3 className="text-xl font-medium text-gray-600">
                    Delete Account
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  This action cannot be undone. This will permanently delete
                  your university account and remove all access to services.
                </p>
                <button
                  onClick={requestAccountDeletion}
                  className="w-full bg-red-300 text-white px-6 py-3 rounded-lg hover:bg-red-400 transition-colors"
                >
                  Request Account Deletion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniPrivacy;
