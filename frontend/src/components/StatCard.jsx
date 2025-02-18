import React from "react";

export function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900">
        {value.toLocaleString()}
      </p>
    </div>
  );
}
