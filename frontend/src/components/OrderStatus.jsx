import React, { useState } from "react";
import {
  Package,
  Truck,
  WashingMachine,
  CheckCircle,
  Calendar,
  Search,
  ArrowRight,
} from "lucide-react";
import StudentNavbar from "../navbars/StudentNavbar";

function OrderStatus() {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  // Mock data - in a real app, this would come from an API
  const orders = [
    {
      id: "1",
      date: "2024-03-10",
      status: "washing",
      items: [
        { name: "Shirts", quantity: 3 },
        { name: "Pants", quantity: 2 },
      ],
      totalWeight: 2.5,
      pickupTime: "10:00 AM",
    },
    {
      id: "2",
      date: "2024-03-08",
      status: "delivered",
      items: [
        { name: "Kurtis", quantity: 2 },
        { name: "Bedsheets", quantity: 1 },
      ],
      totalWeight: 3.1,
      pickupTime: "11:30 AM",
      deliveryTime: "6:00 PM",
    },
    {
      id: "3",
      date: "2024-02-15",
      status: "ready",
      items: [
        { name: "T-Shirts", quantity: 4 },
        { name: "Jeans", quantity: 2 },
      ],
      totalWeight: 4.2,
      pickupTime: "9:15 AM",
      deliveryTime: "5:30 PM",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "picked-up":
        return <Package className="text-yellow-500" size={28} />;
      case "washing":
        return <WashingMachine className="text-blue-500" size={28} />;
      case "ready":
        return <Truck className="text-purple-500" size={28} />;
      case "delivered":
        return <CheckCircle className="text-green-500" size={28} />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "picked-up":
        return "Picked Up";
      case "washing":
        return "Under Wash";
      case "ready":
        return "Ready for Delivery";
      case "delivered":
        return "Delivered";
      default:
        return "";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "picked-up":
        return "bg-yellow-50 text-yellow-700";
      case "washing":
        return "bg-blue-50 text-blue-700";
      case "ready":
        return "bg-purple-50 text-purple-700";
      case "delivered":
        return "bg-green-50 text-green-700";
      default:
        return "";
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.date.startsWith(selectedMonth)
  );

  return (
    <div className=" min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] ">
      <StudentNavbar />
      <div className="translate-y-20 mt-4 max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="md:text-2xl font-bold text-gray-900">
            Order Status & History
          </h1>
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-gray-500" />
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className=" px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search orders by ID or items..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Package className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-600">
              No orders were found for the selected month. Try selecting a
              different month or checking back later.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-sm text-gray-500">Order ID</span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        #{order.id}
                      </h3>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full ${getStatusColor(
                        order.status
                      )} flex items-center gap-2`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="font-medium">
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div>
                      <span className="block text-gray-500">Order Date</span>
                      <span>
                        {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Total Weight</span>
                      <span>{order.totalWeight} kg</span>
                    </div>
                    {order.pickupTime && (
                      <div>
                        <span className="block text-gray-500">Pickup Time</span>
                        <span>{order.pickupTime}</span>
                      </div>
                    )}
                    {order.deliveryTime && (
                      <div>
                        <span className="block text-gray-500">
                          Delivery Time
                        </span>
                        <span>{order.deliveryTime}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 bg-gray-50">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Order Items
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg border border-gray-100"
                      >
                        <span className="text-gray-600 text-sm">
                          {item.name}
                        </span>
                        <div className="font-medium text-gray-900">
                          {item.quantity} pieces
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Timeline */}
                {order.status !== "delivered" && (
                  <div className="px-6 py-4 bg-blue-50 border-t border-blue-100">
                    <div className="flex items-center gap-3 text-sm text-blue-700">
                      <span className="font-medium">Next Step:</span>
                      <ArrowRight size={16} />
                      <span>
                        {order.status === "picked-up"
                          ? "Washing"
                          : order.status === "washing"
                          ? "Ready for Delivery"
                          : "Delivery"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderStatus;
