import { Waves, Plus, Users, Truck, Trash2, Edit } from "lucide-react";
import React, { useContext, useState } from "react";
import { UniversityNavbar } from "./UniversityNavbar";
import { UniversityDataContext } from "../context/UniversityContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function LaundryDelivery() {
  const { university, setUniversity } = useContext(UniversityDataContext);
  const [activeTab, setActiveTab] = useState("add");
  const [agentType, setAgentType] = useState("laundry");
  const [laundryAgents, setLaundryAgents] = useState(university.laundries);
  const [deliveryAgents, setDeliveryAgents] = useState([]);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    laundryId: "",
    employeeId: "",
    phoneNumber: "",
  });

  const handleDeliverySubmit = async (e) => {};

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/university/add-laundry",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );
      setUniversity(response.data.uni);
      setLaundryAgents(university.laundries);
      toast.success("Laundry added successfully");

      //   setLaundryAgents([
      //     ...laundryAgents,
      //     {
      //       id: Date.now().toString(),
      //       name: formData.name,
      //       email: formData.email,
      //       laundryId: formData.laundryId,
      //     },
      //   ]);
      // } else {
      //   setDeliveryAgents([
      //     ...deliveryAgents,
      //     {
      //       id: Date.now().toString(),
      //       name: formData.name,
      //       email: formData.email,
      //       employeeId: formData.employeeId,
      //       phoneNumber: formData.phoneNumber,
      //     },
      //   ]);
      // }
      // Reset form
      setFormData({
        name: "",
        email: "",
        laundryId: "",
        employeeId: "",
        phoneNumber: "",
      });
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const deleteLaundry = async (laundryId) => {
    console.log(laundryId);
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete laundry"
      );
      if (!confirmDelete) return;
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/university/delete-laundry/${laundryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error deleting laundry");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9]">
      {/* Header */}
      <UniversityNavbar />

      {/* Top Section */}

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 bg-white sticky top-0 shadow-sm">
        <button
          className={`flex-1 py-4 px-6 focus:outline-none transition-all duration-200 ${
            activeTab === "add"
              ? "border-b-2 border-gray-500 text-gray-600 bg-[#94bbe9]"
              : "text-gray-500 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("add")}
        >
          <div className="flex items-center justify-center gap-2">
            <Plus size={20} />
            <span>Add Agent</span>
          </div>
        </button>
        <button
          className={`flex-1 py-4 px-6 focus:outline-none transition-all duration-200 ${
            activeTab === "view"
              ? "border-b-2 border-gray-500 text-gray-600 bg-[#eeaeca]"
              : "text-gray-500 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("view")}
        >
          <div className="flex items-center justify-center gap-2">
            <Users size={20} />
            <span>View Agents</span>
          </div>
        </button>
      </div>

      <div className=" mx-auto px-4 py-6">
        {activeTab === "add" ? (
          <div className="max-w-md mx-auto">
            {/* Agent Type Selection */}
            <div className="flex gap-4 mb-6">
              <button
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 ${
                  agentType === "laundry"
                    ? "bg-gray-300 text-gray-700 shadow-lg transform scale-105"
                    : "bg-white text-gray-600 shadow hover:shadow-md"
                }`}
                onClick={() => setAgentType("laundry")}
              >
                <div className="flex items-center justify-center gap-2">
                  <Users size={20} />
                  <span>Laundry Agent</span>
                </div>
              </button>
              <button
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-200 ${
                  agentType === "delivery"
                    ? "bg-gray-300 text-gray-700 shadow-lg transform scale-105"
                    : "bg-white text-gray-600 shadow hover:shadow-md"
                }`}
                onClick={() => setAgentType("delivery")}
              >
                <div className="flex items-center justify-center gap-2">
                  <Truck size={20} />
                  <span>Delivery Agent</span>
                </div>
              </button>
            </div>

            {/* Add Agent Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors"
                />
              </div>
              {agentType === "laundry" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Laundry ID
                  </label>
                  <input
                    type="text"
                    name="laundryId"
                    value={formData.laundryId}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors"
                    />
                  </div>
                </>
              )}
              <button
                onClick={
                  agentType === "laundry" ? handleSubmit : handleDeliverySubmit
                }
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-gray-400 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
              >
                Add {agentType === "laundry" ? "Laundry" : "Delivery"} Agent
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 md:w-3/5 mx-auto">
            {/* Laundry Agents List */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                <h2 className="text-lg font-semibold text-blue-900">
                  Laundry Agents
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {laundryAgents.map((agent) => (
                  <div
                    key={agent._id}
                    className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col gap-4">
                      <h3 className="font-medium text-lg text-gray-900">
                        {agent.name}
                      </h3>
                      <p className="text-sm text-gray-500">{agent.email}</p>
                      <p className="text-sm text-gray-500">
                        ID: {agent.laundryId}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteLaundry(agent._id)}
                      className="text-red-600 flex items-center hover:text-red-800 p-2 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 size={20} /> <span className="mr-">Delete</span>
                    </button>
                  </div>
                ))}
                {laundryAgents.length === 0 && (
                  <p className="p-8 text-center text-gray-500 bg-gray-50">
                    No laundry agents added yet
                  </p>
                )}
              </div>
            </div>

            {/* Delivery Agents List */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                <h2 className="text-lg font-semibold text-blue-900">
                  Delivery Agents
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {deliveryAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {agent.name}
                      </h3>
                      <p className="text-sm text-gray-500">{agent.email}</p>
                      <p className="text-sm text-gray-500">
                        ID: {agent.employeeId}
                      </p>
                      <p className="text-sm text-gray-500">
                        Phone: {agent.phoneNumber}
                      </p>
                    </div>
                    <div className="flex gap-2 ">
                      <button className="text-yellow-600 flex items-center  hover:text-yellow-800 p-2 hover:bg-red-50 rounded-full transition-colors">
                        <Edit size={20} /> <span>Edit </span>
                      </button>
                      <button
                        onClick={() => removeAgent(agent.id, "delivery")}
                        className="text-red-600 flex items-center hover:text-red-800 p-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 size={20} /> <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
                {deliveryAgents.length === 0 && (
                  <p className="p-8 text-center text-gray-500 bg-gray-50">
                    No delivery agents added yet
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LaundryDelivery;
