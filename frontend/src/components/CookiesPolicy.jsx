import React from "react";
import Navbar from "../navbars/NavBar";

const CookiesPolicy = () => {
  return (
    <>
      <Navbar />

      <div className=" pt-28  min-h-screen w-full bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] flex flex-col items-center px-4 py-8 sm:px-8 md:px-16 lg:px-32">
        <div className="w-full max-w-4xl space-y-10 bg-white bg-opacity-60 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-xl">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              What Are Cookies
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Cookies are small text files stored on your device that help us
              provide and improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              How We Use Cookies
            </h2>
            <ul className="list-disc pl-5 text-sm sm:text-base text-gray-700 space-y-1">
              <li>Essential cookies for site functionality</li>
              <li>Analytics cookies to improve our service</li>
              <li>Preference cookies to remember your settings</li>
              <li>Authentication cookies to keep you logged in</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              Managing Cookies
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              You can control cookies through your browser settings. Note that
              disabling certain cookies may limit your ability to use some
              features.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default CookiesPolicy;
