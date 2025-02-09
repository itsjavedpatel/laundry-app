import React from "react";
import { WashingMachine, Truck, Clock, Calendar, Package } from "lucide-react";
const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3"
            alt="About Our Service"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">About E-DHOबी</h2>
          <p className="text-lg text-gray-600">
            We're revolutionizing the way you handle laundry. Our smart
            management system combines convenience with technology to deliver an
            exceptional laundry experience. With real-time tracking, flexible
            scheduling, and professional care for your garments, we make laundry
            day something to look forward to.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-blue-600" />
              <span>24/7 Service</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="h-6 w-6 text-blue-600" />
              <span>Free Pickup</span>
            </div>
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-blue-600" />
              <span>Eco-Friendly</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <span>Easy Scheduling</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
