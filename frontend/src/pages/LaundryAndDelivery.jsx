import React, { useState } from "react";
import {
  Shirt as Tshirt,
  Loader2,
  PackageCheck,
  CheckCircle2,
  ArrowUpDown,
} from "lucide-react";
import Navbar from "../components/NavBar";

const initialOrders = [
  {
    id: "1",
    name: " Akshay",
    laundryId: "L001",
    hostel: "Block A",
    roomNumber: "101",
    status: "pickup",
    createdAt: new Date("2024-03-10T10:00:00"),
  },
  {
    id: "2",
    name: "Javed",
    laundryId: "L002",
    hostel: "Block B",
    roomNumber: "205",
    status: "washing",
    createdAt: new Date("2024-03-11T14:30:00"),
  },
  {
    id: "3",
    name: "Saket",
    laundryId: "L003",
    hostel: "Block A",
    roomNumber: "304",
    status: "ready",
    createdAt: new Date("2024-03-12T09:15:00"),
  },
];

function LaundryAndDelivery() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedStatus, setSelectedStatus] = useState("pickup");
  const [sortOrder, setSortOrder] = useState("newest");

  const moveToNextStatus = (orderId) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          const statusMap = {
            pickup: "washing",
            washing: "ready",
            ready: "completed",
          };
          return {
            ...order,
            status: statusMap[order.status] || order.status,
          };
        }
        return order;
      })
    );
  };

  const statusButtons = [
    { status: "pickup", label: "To Be Picked Up", icon: PackageCheck },
    { status: "washing", label: "Under Wash", icon: Loader2 },
    { status: "ready", label: "Ready to Deliver", icon: Tshirt },
    { status: "completed", label: "Completed", icon: CheckCircle2 },
  ];

  const toggleSortOrder = () => {
    setSortOrder((current) => (current === "newest" ? "oldest" : "newest"));
  };

  const getSortedOrders = (filteredOrders) => {
    return [...filteredOrders].sort((a, b) => {
      const sortMultiplier = sortOrder === "newest" ? -1 : 1;
      return sortMultiplier * (a.createdAt.getTime() - b.createdAt.getTime());
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9]">
      <Navbar />

      <main className=" bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] max-w-7xl mx-auto px-4 py-6">
        <div className=" bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] border-b">
            {statusButtons.map(({ status, label, icon: Icon }) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors
                  ${
                    selectedStatus === status
                      ? "bg-gray-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>

          <div className="px-6 py-3 bg-gray-50 border-b flex justify-end">
            <button
              onClick={toggleSortOrder}
              className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <ArrowUpDown className="w-4 h-4" />
              Sort by:{" "}
              {sortOrder === "newest" ? "Newest First" : "Oldest First"}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Laundry ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hostel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getSortedOrders(
                  orders.filter((order) => order.status === selectedStatus)
                ).map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.laundryId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.hostel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.roomNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.status !== "completed" && (
                        <button
                          onClick={() => moveToNextStatus(order.id)}
                          className="px-3 py-1 bg-gray-400 text-white rounded-md"
                        >
                          Move Next
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LaundryAndDelivery;
