import React, { useState } from "react";
import { Shirt, Bed, AlertCircle } from "lucide-react";
import Navbar from "../navbars/NavBar";

function PlaceOrder() {
  const [items, setItems] = useState([
    // Boys Items
    {
      id: "boys-shirts",
      name: "Shirts",
      icon: <Shirt size={24} />,
      quantity: 0,
      category: "boys",
    },
    {
      id: "boys-tshirts",
      name: "T-Shirts",
      icon: <Shirt size={24} />,
      quantity: 0,
      category: "boys",
    },
    {
      id: "boys-pants",
      name: "Pants",
      icon: <Shirt size={24} />,
      quantity: 0,
      category: "boys",
    },
    {
      id: "boys-jeans",
      name: "Jeans",
      icon: <Shirt size={24} />,
      quantity: 0,
      category: "boys",
    },

    // Girls Items
    {
      id: "girls-kurtis",
      name: "Kurtis",
      icon: <Shirt size={24} />,
      quantity: 0,
      category: "girls",
    },
    {
      id: "girls-tops",
      name: "Tops",
      icon: <Shirt size={24} />,
      quantity: 0,
      category: "girls",
    },
    {
      id: "girls-pants",
      name: "Pants",
      icon: <Shirt size={24} />,
      quantity: 0,
      category: "girls",
    },
    {
      id: "girls-jeans",
      name: "Jeans",
      icon: <Shirt size={24} />,
      quantity: 0,
      category: "girls",
    },

    // Common Items
    {
      id: "bedsheets",
      name: "Bedsheets",
      icon: <Bed size={24} />,
      quantity: 0,
      category: "common",
    },
    {
      id: "pillowcovers",
      name: "Pillow Covers",
      icon: <Bed size={24} />,
      quantity: 0,
      category: "common",
    },
  ]);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState(null);

  const remainingWashes = 2;
  const totalWashesPerMonth = 3;

  const calculateTotalWeight = () => {
    const weights = {
      "boys-shirts": 0.2,
      "boys-tshirts": 0.15,
      "boys-pants": 0.4,
      "boys-jeans": 0.5,
      "girls-kurtis": 0.3,
      "girls-tops": 0.2,
      "girls-pants": 0.4,
      "girls-jeans": 0.5,
      bedsheets: 0.8,
      pillowcovers: 0.2,
    };

    return items.reduce(
      (total, item) => total + (weights[item.id] * item.quantity || 0),
      0
    );
  };

  const updateQuantity = (id, value) => {
    setError(null);
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, value) } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalWeight = calculateTotalWeight();

    if (totalWeight > 6) {
      setError(
        `Total weight (${totalWeight.toFixed(1)} kg) exceeds the 6 kg limit`
      );
      return;
    }

    if (remainingWashes === 0) {
      setError("You have used all your washes for this month");
      return;
    }

    if (items.some((item) => item.quantity > 0)) {
      setOrderPlaced(true);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9]">
        <Navbar />
        <div className="bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] p-6 rounded-lg  text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-4">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-4">
            Your delivery will be scheduled soon. We'll notify you when your
            clothes are picked up.
          </p>
          <button
            onClick={() => setOrderPlaced(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] ">
      <Navbar />
      <div className=" mt-5 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Place New Order</h1>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="font-semibold text-blue-800 mb-2">
            Monthly Wash Status
          </h2>
          <p className="text-blue-600">
            Remaining washes: {remainingWashes} of {totalWashesPerMonth}
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-yellow-600" size={20} />
            <h2 className="font-semibold text-yellow-800">Important Notes</h2>
          </div>
          <ul className="text-yellow-700 text-sm list-disc list-inside space-y-1">
            <li>Undergarments and socks are not allowed</li>
            <li>Total weight should be less than 6 kg</li>
            <li>Maximum 3 washes allowed per month</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="  p-6 rounded-lg shadow-md">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {["boys", "girls", "common"].map((category) => (
            <div key={category} className="mb-6">
              <h2 className="text-lg font-semibold mb-4">
                {category === "common"
                  ? "Bedding"
                  : `${
                      category.charAt(0).toUpperCase() + category.slice(1)
                    } Clothing`}
              </h2>
              {items
                .filter((item) => item.category === category)
                .map((item) => (
                  <div key={item.id} className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-16 text-center border rounded-md"
                          min="0"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}

          <div className="text-sm text-gray-600 mb-4">
            Estimated Weight: {calculateTotalWeight().toFixed(1)} kg
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
            disabled={!items.some((item) => item.quantity > 0)}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default PlaceOrder;
