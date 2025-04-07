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
              src="https://th.bing.com/th/id/R.3eaec632f24961bd7b2a99bc595279d2?rik=9tLCxaHHRR7AeQ&riu=http%3a%2f%2fwww.katebackdrop.com%2fcdn%2fshop%2fproducts%2fBH1047473D.webp%3fv%3d1708506435&ehk=TRfIP20S%2fCDyhg%2bGsk%2bC1qYP%2buC1zbFHQFGzTBRrBw4%3d&risl=&pid=ImgRaw&r=0"
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
