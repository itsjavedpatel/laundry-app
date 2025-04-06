import React from "react";
import Navbar from "../navbars/NavBar";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen w-full bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] flex flex-col">
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-4xl space-y-10 bg-white bg-opacity-60 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-xl">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Information We Collect
              </h2>
              <p className="text-gray-700">
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Name and contact information</li>
                <li>Student ID and university details</li>
                <li>Laundry preferences and history</li>
                <li>Payment information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-gray-700">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Provide and improve our services</li>
                <li>Process your transactions</li>
                <li>Send you service updates</li>
                <li>Respond to your requests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Information Sharing
              </h2>
              <p className="text-gray-700">
                We do not sell or share your personal information with third
                parties except as necessary to provide our services or as
                required by law.
              </p>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default PrivacyPolicy;
