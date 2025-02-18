import React from "react";
import { School, Users } from "lucide-react";
import { PieChart } from "./PieChart";

import { StatCard } from "./StatCard";
import { UniversityNavbar } from "./UniversityNavbar";

function Unidashboard() {
  const universityData = {
    name: "Delhi Technical University",
    email: "admin@dtu.edu.in",
    ugcCode: "UGC-123456",
    status: "Active",
    validUpto: "2025-12-31",
    totalStudents: 15000,
    activeStudents: 12500,
    inactiveStudents: 2500,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UniversityNavbar />
      <main className="p-6 lg:p-8 pt-24">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to {universityData.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your laundry services efficiently
          </p>
        </div>

        {/* University Profile Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
              <School className="w-16 h-16 text-blue-600" />
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {universityData.name}
              </h2>
              <div className="grid gap-4 max-w-md mx-auto">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-gray-900 font-medium">
                    {universityData.email}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">UGC Code:</span>
                  <span className="text-gray-900 font-medium">
                    {universityData.ugcCode}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Status:</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {universityData.status}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Valid Upto:</span>
                  <span className="text-gray-900 font-medium">
                    {universityData.validUpto}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={universityData.totalStudents}
            icon={<Users className="w-6 h-6 text-blue-600" />}
          />
          <StatCard
            title="Active Students"
            value={universityData.activeStudents}
            icon={<Users className="w-6 h-6 text-green-600" />}
          />
          <StatCard
            title="Inactive Students"
            value={universityData.inactiveStudents}
            icon={<Users className="w-6 h-6 text-red-600" />}
          />
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
            Student Distribution
          </h3>
          <div className="h-96">
            <PieChart data={universityData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Unidashboard;
