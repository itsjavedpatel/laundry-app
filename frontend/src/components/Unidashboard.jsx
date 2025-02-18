import React from "react";
import { School, Users } from "lucide-react";
import { PieChart } from "./PieChart";
import { StatCard } from "./StatCard";
import { UniversityNavbar } from "./UniversityNavbar";

function Unidashboard() {
  const universityData = {
    name: "NIMS University",
    email: "admin@nimsuniversity.edu.in",
    ugcCode: "UGC-123456",
    address: "NIMS University, Rajasthan India",
    status: "Active",
    validUpto: "2025-12-31",
    totalStudents: 15000,
    activeStudents: 12500,
    inactiveStudents: 2500,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversityNavbar />
      <main className="p-4 sm:p-6 lg:p-8 pt-24">
        {/* Welcome Section */}
        <div className="text-center mt-12 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome to {universityData.name}
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Manage your laundry services efficiently
          </p>
        </div>

        {/* University Profile Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg flex flex-col items-center justify-center mb-4 sm:mb-0">
              <img className="w-full h-full object-cover bg-blue-600 rounded-lg" alt="University Logo" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-2">
                {universityData.name}
              </h2>
            </div>
            <div className="w-full">
              <div className="grid gap-3 sm:gap-4 max-w-md mx-auto">
                {[
                  { label: "Email", value: universityData.email },
                  { label: "UGC Code", value: universityData.ugcCode },
                  { label: "Address", value: universityData.address },
                  { label: "Status", value: universityData.status, isBadge: true },
                  { label: "Valid Upto", value: universityData.validUpto },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100"
                  >
                    <span className="text-gray-600 text-sm sm:text-base">{item.label}:</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 mx-4">
          <StatCard
            title="Total Students"
            value={universityData.totalStudents}
            icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
          />
          <StatCard
            title="Active Students"
            value={universityData.activeStudents}
            icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />}
          />
          <StatCard
            title="Inactive Students"
            value={universityData.inactiveStudents}
            icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />}
          />
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Student Distribution
          </h3>
          <div className="h-72 sm:h-96">
            <PieChart data={universityData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Unidashboard;
