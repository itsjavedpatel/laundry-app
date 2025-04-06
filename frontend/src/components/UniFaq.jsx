import React from "react";

import { UniversityNavbar } from "../navbars/UniversityNavbar";

const UniFaq = () => {
  const faqs = [
    {
      q: "How can we add students to the system?",
      a: "Navigate to your University Dashboard, go to the 'Services' section, select 'Students', and click the 'Add' button. Fill in the required student details and submit. The student will then appear in your student list.",
    },
    {
      q: "What are the service hours for E-DHOBI?",
      a: "Our services are operational from 9:00 AM to 6:00 PM, seven days a week, including weekends.",
    },
    {
      q: "How can we export student data to an Excel sheet?",
      a: "From your University Dashboard, go to the 'Services' section, select 'Students', and click on the green 'Export' button to download the student data in Excel format.",
    },
    {
      q: "How do we add a new laundry service?",
      a: "Access the University Dashboard, navigate to the 'Services' section, select 'Laundry', and click the 'Add Laundry' button. Fill in the laundry details and submit the form to add it to your list.",
    },
    {
      q: "Where can we view student laundry requests?",
      a: "Click on the bell icon in the navigation bar. All incoming student fee verification requests are listed there, with options to accept or reject them.",
    },
    {
      q: "Can we update university profile details?",
      a: "Yes, go to your profile section in the dashboard and click 'Edit Profile'. Update the required details and save the changes.",
    },
    {
      q: "How to view and manage all laundries associated with our university?",
      a: "Navigate to the 'Laundry' tab in the 'Services' section of the dashboard to view, update, or remove existing laundries linked to your university.",
    },
    {
      q: "Can we remove or deactivate a student from the system?",
      a: "Yes, go to the 'Students' section under 'Services'. Click on the student's record and choose the 'Deactivate' or 'Remove' option as needed.",
    },
    {
      q: "Is there a way to monitor laundry workload or capacity?",
      a: "Yes, each laundry listing displays its current capacity status. You can monitor real-time order loads and update max capacity from the laundry management section.",
    },
    {
      q: "Are notifications sent when students submit fee receipts?",
      a: "Yes, notifications appear via the bell icon whenever a student uploads a fee receipt for verification. You can review and act on them immediately.",
    },
  ];

  return (
    <>
      <UniversityNavbar />

      <div className="min-h-screen w-full bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] flex flex-col">
        <main className="flex-grow flex items-center justify-center px-4 py-10 sm:py-16">
          <div className="w-full max-w-3xl bg-white bg-opacity-60 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-10 space-y-10">
            <h1 className="text-3xl font-bold text-gray-900 text-center">
              Frequently Asked Questions
            </h1>
            <div className="space-y-5">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-90 p-5 rounded-lg shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {faq.q}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base">{faq.a}</p>
                </div>
              ))}
            </div>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                Still Have Questions?
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">
                Contact our support team through the Help & Support page or
                email us at
                <span className="font-medium"> edhobi111@gmail.com</span>
              </p>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default UniFaq;
