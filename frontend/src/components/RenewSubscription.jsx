import React, { useContext, useState } from "react";
import { CreditCard } from "lucide-react";
import Navbar from "../navbars/NavBar";
import { StudentDataContext } from "./../context/StudentContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Subscription() {
  const { student } = useContext(StudentDataContext);
  const [receiptNumber, setReceiptNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        studentName: student.name,
        studentId: student.studentId,
        receiptNumber: receiptNumber.trim(),
      };

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/student/request-service`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (receiptNumber.trim()) {
        setIsSubmitted(true);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else toast.error("Unable to send request");
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <div className=" min-h-screen  bg-gradient-to-r from-[#eeaeca] to-[#94bbe9]">
          <div className="max-w-md mx-auto  translate-y-32   p-6 rounded-lg  text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-4">
              Submitted successfully!{" "}
            </h2>
            <p className="text-gray-600 mb-4">
              Your subscription will be renewed by the university upon
              verification of your credentials. You may continue using our
              services once the verification process is complete.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-2  min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] ">
        <div className=" bg-white translate-y-32 rounded-lg shadow-md  max-w-md mx-auto">
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
