import React from "react";
import Navbar from "../navbars/NavBar";
import Footer from "./Footer";

const GrievanceRedressal = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] flex flex-col">
        <main className="flex-grow flex items-center justify-center px-4 py-10 sm:py-16">
          <div className="w-full max-w-3xl bg-white bg-opacity-60 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-10 space-y-10">
            <h1 className="text-3xl font-bold text-gray-900 text-center">
              Grievance Redressal
            </h1>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Grievance Resolution Process
              </h2>
              <div className="space-y-4">
                {[
                  {
                    step: "Step 1: Submit Your Complaint",
                    detail:
                      "File your grievance through our app or website with all relevant details and supporting documents.",
                  },
                  {
                    step: "Step 2: Acknowledgment",
                    detail:
                      "Receive a confirmation within 24 hours with a unique tracking number.",
                  },
                  {
                    step: "Step 3: Investigation",
                    detail:
                      "Our team will investigate your complaint and may contact you for additional information.",
                  },
                  {
                    step: "Step 4: Resolution",
                    detail:
                      "Receive a detailed resolution within 7 working days.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-90 p-5 rounded-lg shadow-sm"
                  >
                    <h3 className="font-medium mb-2">{item.step}</h3>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="bg-white bg-opacity-90 p-5 rounded-lg shadow-sm text-sm sm:text-base text-gray-700">
                <p>
                  <span className="font-semibold">Grievance team:</span> E-DHOBI
                  Team
                  <br />
                  <span className="font-semibold">Email:</span>{" "}
                  <a>edhobi111@gmail.com</a>
                  <br />
                  <span className="font-semibold">Address:</span> JAIPUR
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default GrievanceRedressal;
