import React from "react";
import Navbar from "../navbars/NavBar";
import Footer from "./Footer";

const Faq = () => {
  const faqs = [
    {
      q: "How do I schedule a pickup?",
      a: "You can schedule a pickup through our mobile app or website by selecting your preferred time slot and location.",
    },
    {
      q: "What are the service hours?",
      a: "We operate from 8 AM to 8 PM, seven days a week. Pickups and deliveries are scheduled within these hours.",
    },
    {
      q: "How can I reactivate my services?",
      a: "Go to your Dashboard, navigate to the Reactivate section, enter your fee receipt number, and submit the form. Once the university verifies your details, we will notify you and your services will be resumed.",
    },
    {
      q: "I'm not able to place an order",
      a: "First, check your account status. If it's inactive, go to the Reactivate section, enter your fee receipt details, and submit the form. If your status is active, you may have exceeded your monthly wash limit.",
    },
    {
      q: "How do I report missing items?",
      a: "Contact our support team immediately through the app or call our helpline. We'll track your items within 24 hours.",
    },
  ];

  return (
    <>
      <Navbar />

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

export default Faq;
