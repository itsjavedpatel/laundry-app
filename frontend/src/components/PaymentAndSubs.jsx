import React, { useState } from "react";
import { Calendar, CheckCircle, AlertCircle, Shield, Gift } from "lucide-react";
import { UniversityNavbar } from "./UniversityNavbar";

const PaymentAndSubs = () => {
  const plans = [
    {
      id: "plan-1",
      name: "Basic",
      studentRange: "<2000 students",
      price6Months: 25000,
      priceAnnual: 45000,
    },
    {
      id: "plan-2",
      name: "Standard",
      studentRange: "2000-4000 students",
      price6Months: 45000,
      priceAnnual: 75000,
    },
    {
      id: "plan-3",
      name: "Premium",
      studentRange: "5000-7000 students",
      price6Months: 60000,
      priceAnnual: 100000,
    },
    {
      id: "plan-4",
      name: "Enterprise",
      studentRange: "7000-10000 students",
      price6Months: 80000,
      priceAnnual: 140000,
    },
    {
      id: "plan-5",
      name: "Enterprise Plus",
      studentRange: "10000-15000 students",
      price6Months: 100000,
      priceAnnual: 180000,
    },
    {
      id: "plan-6",
      name: "Enterprise Pro",
      studentRange: "15000-20000 students",
      price6Months: 120000,
      priceAnnual: 200000,
    },
    {
      id: "plan-7",
      name: "Enterprise Max",
      studentRange: ">20000 students",
      price6Months: 150000,
      priceAnnual: 295000,
    },
  ];
  const [selectedPlanType, setSelectedPlanType] = useState("6months");
  const [currentPlan] = useState({
    status: "active",
    validUpto: "2024-09-30",
    plan: "Standard",
    type: "6months",
  });

  const handlePayment = (planId) => {
    // Here you would integrate with your payment gateway
    console.log(`Processing payment for plan: ${planId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <UniversityNavbar />
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">
              Current Subscription
            </h2>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center space-x-3">
                {currentPlan.status === "active" ? (
                  <CheckCircle className="text-green-500" size={32} />
                ) : (
                  <AlertCircle className="text-red-500" size={32} />
                )}
                <div>
                  <span
                    className={`text-lg font-semibold ${
                      currentPlan.status === "active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {currentPlan.status.charAt(0).toUpperCase() +
                      currentPlan.status.slice(1)}
                  </span>
                  <p className="text-sm text-gray-500">Subscription Status</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="text-blue-500" size={32} />
                <div>
                  <span className="text-lg font-semibold">
                    {currentPlan.validUpto}
                  </span>
                  <p className="text-sm text-gray-500">Valid Until</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Shield className="text-blue-500" size={32} />
                <div>
                  <span className="text-lg font-semibold">
                    {currentPlan.plan}
                  </span>
                  <p className="text-sm text-gray-500">Current Plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Available Plans</h2>
          </div>

          <div className="p-6">
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg border-2 border-blue-200 p-1">
                <button
                  className={`px-6 py-2 rounded-md transition-colors ${
                    selectedPlanType === "6months"
                      ? "bg-blue-600 text-white"
                      : "text-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={() => setSelectedPlanType("6months")}
                >
                  6 Months
                </button>
                <button
                  className={`px-6 py-2 rounded-md transition-colors ${
                    selectedPlanType === "annual"
                      ? "bg-blue-600 text-white"
                      : "text-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={() => setSelectedPlanType("annual")}
                >
                  Annual
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="border-2 border-gray-100 rounded-xl hover:border-blue-200 transition-colors"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {plan.name}
                      </h3>
                      <Gift className="text-blue-500" size={24} />
                    </div>
                    <p className="text-gray-600 mb-4">{plan.studentRange}</p>
                    <div className="text-3xl font-bold text-blue-600 mb-6">
                      ₹
                      {selectedPlanType === "6months"
                        ? plan.price6Months.toLocaleString()
                        : plan.priceAnnual.toLocaleString()}
                      <span className="text-sm font-normal text-gray-500">
                        /{selectedPlanType === "6months" ? "6mo" : "yr"}
                      </span>
                    </div>
                    <button
                      onClick={() => handlePayment(plan.id)}
                      className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      {currentPlan.plan === plan.name
                        ? "Renew Plan"
                        : "Upgrade Plan"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAndSubs;
