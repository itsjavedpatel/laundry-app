import React, { useContext, useState } from "react";
import StudentNavbar from "../navbars/StudentNavbar";
import {
  Calendar,
  Package,
  Clock,
  XCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import OrderCard from "./OrderCard";
import { StudentDataContext } from "../context/StudentContext";

const mockOrders = [
  {
    id: "ORD-001",
    status: "processing",
    laundryName: "Fresh & Clean",
    itemCount: 5,
    datePlaced: "2024-03-10T10:30:00Z",
  },
  {
    id: "ORD-002",
    status: "placed",
    laundryName: "Quick Wash",
    itemCount: 3,
    datePlaced: "2024-03-09T15:45:00Z",
  },
  {
    id: "ORD-003",
    status: "completed",
    laundryName: "Sparkle Laundry",
    itemCount: 7,
    datePlaced: "2024-03-08T09:20:00Z",
  },
  {
    id: "ORD-004",
    status: "rejected",
    laundryName: "Clean Express",
    itemCount: 4,
    datePlaced: "2024-03-07T14:15:00Z",
  },
];

// const statusColors = {
//   placed: "bg-blue-100 text-blue-800",
//   processing: "bg-yellow-100 text-yellow-800",
//   completed: "bg-green-100 text-green-800",
//   rejected: "bg-red-100 text-red-800",
// };

// const statusIcons = {
//   placed: Clock,
//   processing: Package,
//   completed: CheckCircle,
//   rejected: XCircle,
// };

// const OrderCard = ({ order }) => {
//   const StatusIcon = statusIcons[order.status];
//   const date = new Date(order.datePlaced).toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });

//   return (
//     <div
//       className={`bg-white rounded-lg shadow-md p-4 ${
//         order.status === "processing" ? "animate-pulse" : ""
//       }`}
//     >
//       <div className="flex justify-between items-start mb-3">
//         <span className="text-sm font-medium text-gray-600">{order.id}</span>
//         <span
//           className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
//             statusColors[order.status]
//           }`}
//         >
//           <StatusIcon size={14} />
//           {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//         </span>
//       </div>
//       <h3 className="text-lg font-semibold mb-2">{order.laundryName}</h3>
//       <div className="flex flex-col gap-2 text-sm text-gray-600">
//         <div className="flex items-center gap-2">
//           <Package size={16} />
//           <span>{order.itemCount} items</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <Calendar size={16} />
//           <span>{date}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

const OrderStatus = () => {
  const { student } = useContext(StudentDataContext);
  console.log(student.orders);
  const [historyFilter, setHistoryFilter] = useState("all");

  const currentOrders = student.orders.filter((order) =>
    ["To be picked up", "Washing", "To be Delivered"].includes(
      order.orderStatus
    )
  );

  const pastOrders = student.orders
    .filter((order) => ["Completed", "Cancelled"].includes(order.orderStatus))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const filteredPastOrders =
    historyFilter === "all"
      ? pastOrders
      : pastOrders.filter((order) => order.orderStatus === historyFilter);

  return (
    <>
      <StudentNavbar />
      <div className="pt-24 min-h-screen max-w-4xl bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] mx-auto px-4 py-6 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Current Orders</h2>
          {currentOrders.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {currentOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">No current orders</p>
            </div>
          )}
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Order History</h2>
            <select
              value={historyFilter}
              onChange={(e) => setHistoryFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm px-3 py-1.5 text-sm"
            >
              <option value="all">All</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          {filteredPastOrders.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredPastOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">No past orders</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default OrderStatus;
