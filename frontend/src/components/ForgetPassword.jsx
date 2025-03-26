import React from "react";
import Navbar from "./NavBar";

const ForgetPassword = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="p-6  space-y-4 md:space-y-6 sm:p-8 ">
          <form className=" space-y-4 md:space-y-6">
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
                id="email"
                className="block w-full pl-5 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                placeholder="Enter your email"
                required
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
