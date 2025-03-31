import React, { useContext } from "react";
import { School, Users } from "lucide-react";
import { PieChart } from "./PieChart";
import { StatCard } from "./StatCard";
import { UniversityNavbar } from "./UniversityNavbar";
import profileimage from "../assets/images/pfp.jpg";
import { UniversityDataContext } from "../context/UniversityContext";

const Unidashboard = () => {
  const { university } = useContext(UniversityDataContext);
  const totalStudents = university.students.length;
  const activeStudents = university.students.filter(
    (student) => student.status === "active"
  ).length;
  const inactiveStudents = totalStudents - activeStudents;
  const data = {
    active: activeStudents,
    inactive: inactiveStudents,
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9]">
      <UniversityNavbar />
      <main className="mt-6 p-4 sm:p-6 lg:p-8 pt-24">
        {/* Welcome Section */}
        <div className="text-center mt-12 mb-12">
          <h1 className="text-2xl  sm:text-5xl font-bold text-gray-900">
            Welcome, {university.name}
          </h1>
          <p className="text-gray-600 text-sm mt-5 sm:text-base">
            Manage your laundry services efficiently
          </p>
        </div>

        {/* University Profile Section */}
        <div className="bg-white  rounded-xl shadow-sm p-4 sm:p-6 mb-6 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-6 items-center  justify-between text-center sm:text-left">
            <div className="pl-10 sm:w-60 sm:h-40 rounded-lg flex flex-col items-center justify-center gap-2 mb-9 sm:mb-0">
              <img
                className=" border aspect-auto object-cover bg-blue-600 rounded-lg"
                src={profileimage}
                alt="University Logo"
              />
              <h2 className="text-xl text-center sm:text-xl font-semibold text-gray-600 mt-2">
                {university.name}
              </h2>
            </div>
            <div className="w-full">
              <div className="grid gap-3 sm:gap-4 max-w-md mx-auto">
                {[
                  { label: "Email", value: university.email },
                  { label: "UGC Code", value: university.UGCcode },
                  { label: "Address", value: university.address },
                  { label: "Zip Code", value: university.zipcode },
                  {
                    label: "Status",
                    value: university.status ? "Subscribed" : "Unsubscribed",
                    isBadge: university.status ? true : false,
                  },
                  { label: "Valid Upto", value: university.validUpto },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100"
                  >
                    <span className="text-gray-600 text-sm sm:text-base">
                      {item.label}:
                    </span>
                    {item.isBadge ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.value}
                      </span>
                    ) : (
                      <span className="text-gray-900 font-medium text-sm sm:text-base">
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 max-w-6xl mx-auto ">
          <StatCard
            title="Total Students"
            value={totalStudents}
            icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
          />
          <StatCard
            title="Active Students"
            value={activeStudents}
            icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />}
          />
          <StatCard
            title="Inactive Students"
            value={inactiveStudents}
            icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />}
          />
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Student Distribution
          </h3>
          <div className="h-72 sm:h-96">
            <PieChart data={data} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Unidashboard;
