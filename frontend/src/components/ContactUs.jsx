import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
const ContactUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
        Contact Us
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-blue-600" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-blue-600" />
                <span className="text-gray-600">contact@smartlaundry.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-blue-600" />
                <span className="text-gray-600">
                  123 Street, Jaipur, Rajasthan 12345
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">Follow Us</h3>
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-[Brown]">
                <Facebook className="h-6 w-6" />
              </button>
              <button className="text-gray-600 hover:text-[Brown]">
                <Twitter className="h-6 w-6" />
              </button>
              <button className="text-gray-600 hover:text-[Brown]">
                <Instagram className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
