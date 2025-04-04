import React, { useState } from "react";
import { CreditCard } from "lucide-react";
import Navbar from "../navbars/NavBar";

function Subscription() {
  const [receiptNumber, setReceiptNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (receiptNumber.trim()) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className=" min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9]">
        <Navbar />
        <div className="max-w-md mx-auto  p-6 rounded-lg  text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-4">Submitted successfully! </h2>
          <p className="text-gray-600 mb-4">
            Your subscription will be renewed by the university upon
            verification of your credentials. You may continue using our
            services once the verification process is complete.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className=" p-4 min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] ">
        <div className=" bg-white  rounded-lg shadow-md mt-7 max-w-md mx-auto">
          <h1 className=" p-4 text-2xl font-bold mb-6">Renew Subscription</h1>
          <div className=" p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="text-gray-600" size={24} />
              <h2 className="text-lg font-semibold">Subscription Details</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="receiptNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Fee Receipt Number
                </label>
                <input
                  type="text"
                  id="receiptNumber"
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Enter your fee receipt number"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Renew Subscription
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscription;
