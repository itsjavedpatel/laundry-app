import React from "react";
import {
  Calendar,
  Package,
  Clock,
  XCircle,
  CheckCircle,
  AlertCircle,
  Truck,
} from "lucide-react";
const statusColors = {
  "To be picked up": "bg-blue-100 text-blue-800",
  Washing: "bg-yellow-100 text-yellow-800",
  "To be Delivered": "bg-orange-300 text-white",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};
// "To be picked up",
// "Washing",
// "To be Delivered",
// "Completed",
// "Cancelled",
const statusIcons = {
  "To be picked up": Clock,
  Washing: Package,
  "To be Delivered": Truck,
  Completed: CheckCircle,
  Cancelled: XCircle,
};
const OrderCard = ({ order }) => {
  const StatusIcon = statusIcons[order.orderStatus];
  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 ${
        order.orderStatus === "Washing" ? "animate-pulse" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm font-medium text-gray-600">
          #{order._id.substring(0, 8)}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
            statusColors[order.orderStatus]
          }`}
        >
          <StatusIcon size={14} />
          {order.orderStatus.charAt(0).toUpperCase() +
            order.orderStatus.slice(1)}
        </span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{order.to.name}</h3>
      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Package size={16} />
          <span>{order.orderDetails.quantity} items</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
