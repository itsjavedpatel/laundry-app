import React from "react";
import { Truck, Clock, Calendar } from "lucide-react";
const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center  mb-12">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: <Truck className="h-12 w-12 text-blue-600" />,
            title: "Pickup & Delivery",
            description:
              "Free pickup and delivery at your doorstep, scheduled at your convenience.",
          },
          {
            icon: <Clock className="h-12 w-12 text-blue-600" />,
            title: "Express Service",
            description:
              "Same-day service for urgent laundry needs with premium care.",
          },
          {
            icon: <Calendar className="h-12 w-12 text-blue-600" />,
            title: "Subscription Plans",
            description:
              "Weekly or monthly plans with special pricing and priority service.",
          },
        ].map((service, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              {service.icon}
              <h3 className="text-xl font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
