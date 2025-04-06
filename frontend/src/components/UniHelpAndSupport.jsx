import React from "react";
import { Link } from "react-router-dom";

import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Calendar,
  Book,
  Wallet,
  ShieldCheck,
  HelpCircle,
  AlertCircle,
  Building2,
} from "lucide-react";
import { UniversityNavbar } from "../navbars/UniversityNavbar";

const ContactCard = ({ icon: Icon, title, content, subtext }) => (
  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
    <Icon className="w-6 h-6 text-indigo-600 mt-1" />
    <div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-gray-700">{content}</p>
      <p className="text-sm text-gray-500 mt-1">{subtext}</p>
    </div>
  </div>
);

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
    <Icon className="w-6 h-6 text-indigo-600 mb-3" />
    <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const UniHelpAndSupport = () => {
  return (
    <div className="bg-gradient-to-r from-[#eeaeca] to-[#94bbe9]">
      <UniversityNavbar />
      <div className=" bg-gradient-to-r from-[#eeaeca] to-[#94bbe9]  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Emergency Contact Banner */}

        {/* Quick Contact Section */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContactCard
              icon={Phone}
              title="Phone Support"
              content="+91-9750XXXXX1"
              subtext="Mon-Fri: 8AM-8PM"
            />
            <ContactCard
              icon={Mail}
              title="Email Support"
              content="edhobi111@gmail.com"
              subtext="24-48hr response time"
            />
            <ContactCard
              icon={MessageSquare}
              title="Live Chat"
              content="Available 24/7"
              subtext="Instant Support"
            />
          </div>
        </section>

        {/* Service Hours & Locations */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Service Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
                <Clock className="w-6 h-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Operating Hours</h3>
                  <ul className="text-gray-600 space-y-2 mt-2">
                    <li className="flex items-center">
                      <span className="w-32">Mon - Fri:</span>
                      <span>7:00 AM - 9:00 PM</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-32">Saturday:</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-32">Sunday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
                <MapPin className="w-6 h-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    Office Locations
                  </h3>
                  <ul className="text-gray-600 space-y-2 mt-2">
                    <li>• City Office (9AM - 5PM)</li>
                    <li className=" space-x-2"> Jaipur </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Services */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ServiceCard
              icon={Calendar}
              title="Schedule Pickup"
              description="Book your laundry pickup time slot online"
            />
            <ServiceCard
              icon={Book}
              title="Track Orders"
              description="Monitor your laundry status in real-time"
            />
            <ServiceCard
              icon={Wallet}
              title="Payment Options"
              description="Multiple payment methods available"
            />
            <ServiceCard
              icon={ShieldCheck}
              title="Special Care Items"
              description="Premium care for delicate garments"
            />
            <ServiceCard
              icon={Building2}
              title="Residence Services"
              description="Special services for on-campus residents"
            />
            <ServiceCard
              icon={HelpCircle}
              title="Service Guide"
              description="Learn how to use our services"
            />
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Quick Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/uni-faq"
              className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
            >
              <h3 className="font-medium mb-2 text-gray-900 group-hover:text-indigo-600">
                Frequently Asked Questions
              </h3>
              <p className="text-gray-600 text-sm">
                Find answers to common questions
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UniHelpAndSupport;
