import React, { useState } from "react";

import { Lock, Mail, AlertTriangle, Shield, Key } from "lucide-react";

const ChangePassword = ({ handlePasswordChange, sendOTP }) => {
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  return (
    <div className="space-y-6">
      {/* Password Change Section */}
      <div className="bg-white rounded-xl  shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-gray-400 to-gray-600 px-6 py-4">
          <div className="flex items-center">
            <Key className="text-white mr-2" size={24} />
            <h2 className="text-2xl font-bold text-white">Change Password</h2>
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
  );
};

export default ChangePassword;
