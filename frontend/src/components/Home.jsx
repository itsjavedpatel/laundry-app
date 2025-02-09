import React from "react";
import {
  WashingMachine,
  Truck,
  Clock,
  Calendar,
  Package,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import About from "./About";
import Services from "./Services";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
const Home = () => {
  return (
    <>
      {/* this is home page and it is written by boult ai */}
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-600 to-green-400 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-5xl font-bold leading-tight">
              Effortless Laundry Services at Your Fingertips
            </h1>
            <p className="text-xl text-blue-100">
              Experience the convenience of modern laundry management with our
              smart solutions.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              Schedule a Pickup
            </button>
          </div>
          {/* src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=2971&ixlib=rb-4.0.3" */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 perspective">
            <img
              src="https://www.thespruce.com/thmb/aVwNrnmY4yY1SwnY4DKMsywRB10=/5616x3744/filters:no_upscale():max_bytes(150000):strip_icc()/girl-leaning-into-laundromat-washer-to-get-clothes-108224630-5aa88a091f4e130037edb934.jpg"
              alt="Modern Laundry Service"
              className="rounded-lg shadow-xl transform rotate-y-[20deg] md:floating"
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        {/* <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3"
                alt="About Our Service"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                About E-DHOबी
              </h2>
              <p className="text-lg text-gray-600">
                We're revolutionizing the way you handle laundry. Our smart
                management system combines convenience with technology to
                deliver an exceptional laundry experience. With real-time
                tracking, flexible scheduling, and professional care for your
                garments, we make laundry day something to look forward to.
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
        </div> */}
        <About />
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20  bg-gray-50 bg-gradient-to-r from-gray-600 to-green-400 text-white"
      >
        <Services />
        {/* <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center  mb-12">
            Our Services
          </h2>
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
        </div> */}
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <ContactUs />
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
