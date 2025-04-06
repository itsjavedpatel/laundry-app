import React from "react";
import Navbar from "../navbars/NavBar";
import Footer from "./Footer";

const TermsOfUse = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen w-full bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] flex flex-col">
        <main className="flex-grow flex items-center justify-center px-4 py-10 sm:py-16">
          <div className="w-full max-w-3xl bg-white bg-opacity-60 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-10 space-y-10">
            <h1 className="text-3xl font-bold text-gray-900 text-center">
              Terms of Use
            </h1>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                Acceptance of Terms
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">
                By accessing and using E-Dhobhi's services, you acknowledge that
                you have read, understood, and agree to be bound by these Terms
                of Use.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                Service Usage
              </h2>
              <ul className="list-disc pl-5 sm:pl-6 text-gray-700 text-sm sm:text-base space-y-1">
                <li>
                  Services are available only to registered university students
                  and staff
                </li>
                <li>Users must maintain accurate account information</li>
                <li>Sharing of accounts is strictly prohibited</li>
                <li>Users are responsible for maintaining password security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                Prohibited Activities
              </h2>
              <ul className="list-disc pl-5 sm:pl-6 text-gray-700 text-sm sm:text-base space-y-1">
                <li>Using the service for illegal purposes</li>
                <li>Attempting to access unauthorized areas of the service</li>
                <li>Submitting false or misleading information</li>
                <li>Interfering with service operations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                Modifications to Service
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">
                We reserve the right to modify or discontinue any part of our
                service with or without notice.
              </p>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default TermsOfUse;
