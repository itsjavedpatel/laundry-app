import React, { useContext, useState } from "react";
import { Shirt, Bed, AlertCircle } from "lucide-react";
import StudentNavbar from "../navbars/StudentNavbar";
import { StudentDataContext } from "../context/StudentContext";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrder() {
  const { setStudent } = useContext(StudentDataContext);
  const token = localStorage.getItem("token");
  const { student } = useContext(StudentDataContext);
  const laundryList = student.university.laundries || [];
  const [items, setItems] = useState([
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
    {
      id: "boys-others",
      name: "Others",
      icon: <Bed size={24} />,
      quantity: 0,
      category: "boys",
    },
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
    {
      id: "girls-others",
      name: "Others",
      icon: <Bed size={24} />,
      quantity: 0,
      category: "girls",
    },
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

  const [selectedLaundry, setSelectedLaundry] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState(null);

  const updateQuantity = (id, value) => {
    setError(null);
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, value) } : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!selectedLaundry) {
        setError("Please select a laundry");
        return;
      }
      console.log(selectedLaundry);
      console.log(items);
      const totalClothesCount = items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      console.log(totalClothesCount);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/student/place-order`,
        { count: totalClothesCount, laundryId: selectedLaundry },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      setStudent(student);
      setOrderPlaced(true);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went Wrong");
      }
    }
  };

  if (laundryList.length === 0) {
    return (
      <>
        <StudentNavbar />
        <div className="pt-24 text-red-600 text-lg font-semibold  bg-red-50 p-4 rounded-md my-4">
          No laundries available for your university yet. Please contact admin.
        </div>
      </>
    );
  }

  if (orderPlaced) {
    return (
      <>
        <StudentNavbar />
        <div className="min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9]">
          <div className="translate-y-16 p-6 rounded-lg text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-4">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Your delivery will be scheduled soon. We'll notify you when your
              clothes are picked up.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9]">
        <div className="py-16 p-2 mt-5 max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6">Place New Order</h1>

          {/* <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h2 className="font-semibold text-blue-800 mb-2">
              Monthly Wash Status
            </h2>
            <p className="text-blue-600">
              Remaining washes: {selectedLaundry.maxWash - student.washCount} of{" "}
              {selectedLaundry.maxWash}
            </p>
          </div> */}

          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-lg shadow-md bg-white"
          >
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label
                className="block mb-2 font-medium text-gray-700"
                htmlFor="laundry"
              >
                Select Laundry <span className="text-red-500">*</span>
              </label>
              <select
                id="laundry"
                value={selectedLaundry}
                onChange={(e) => setSelectedLaundry(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="">-- Choose Laundry --</option>
                {laundryList.map((laundry) => (
                  <option key={laundry._id} value={laundry._id}>
                    {laundry.name}
                  </option>
                ))}
              </select>
            </div>

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

            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
              disabled={!items.some((item) => item.quantity > 0)}
            >
              Place Order
            </button>

            {/* Important Notes   */}
            <div className="bg-yellow-50 p-4 rounded-lg mt-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="text-yellow-600" size={20} />
                <h2 className="font-semibold text-yellow-800">
                  Important Notes
                </h2>
              </div>
              <ul className="text-yellow-700 text-sm list-disc list-inside space-y-1">
                <li>Undergarments and socks are not allowed</li>
                <li>Total weight should be less than 6 kg</li>
                <li>Maximum 3 washes allowed per month</li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PlaceOrder;
