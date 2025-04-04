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
      {/* Hero Section */}
      <div className="relative text-black bg-gradient-to-r from-[#eeaeca] to-[#94bbe9]">
        <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="lg:text-5xl text-3xl lh font-bold  leading-tight">
              Effortless Laundry Services at Your Fingertips
            </h1>
            <p className="text-xl text-grey-600">
              Experience the convenience of modern laundry management with our
              smart solutions.
            </p>
          </div>

          <div className="lg:w-1/2 mt-12 md:w-[70%] lg:mt-0 perspective">
            <img
              src="https://www.thespruce.com/thmb/aVwNrnmY4yY1SwnY4DKMsywRB10=/5616x3744/filters:no_upscale():max_bytes(150000):strip_icc()/girl-leaning-into-laundromat-washer-to-get-clothes-108224630-5aa88a091f4e130037edb934.jpg"
              alt="Modern Laundry Service"
              className="rounded-lg shadow-xl transform rotate-y-[20deg] lg:floating"
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <About />
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20  bg-gray-50 bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] text-white"
      >
        <Services />
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
