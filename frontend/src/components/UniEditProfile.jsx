import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Lock, Mail, MapPin, Upload, X, Link as LinkIcon } from "lucide-react";
import { UniversityNavbar } from "../navbars/UniversityNavbar";
import { UniversityDataContext } from "./../context/UniversityContext";
import axios from "axios";

const UniEditProfile = () => {
  const { university, setUniversity } = useContext(UniversityDataContext);
  const [profile, setProfile] = useState({
    name: university.name,
    email: university.email,
    address: university.address,
    zipCode: university.zipcode,
    UGCcode: university.UGCcode,
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      if (
        profile.address === "" &&
        profile.UGCcode === "" &&
        !profile.zipCode
      ) {
        toast.warn("Atleast One field need to be filled");
        return;
      }
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:3000/university/update-profile",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // setUniversity(response.data.updatedUni);
      // setProfile(response.data.updatedUni);
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eeaeca] to-[#94bbe9] ">
      <UniversityNavbar />
      <div className=" mt-16  max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r  from-gray-400 to-gray-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">
              University Profile
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-14">
            <div className="space-y-8">
              {/* Non-editable fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="relative ">
                    <input
                      type="text"
                      value={profile.name}
                      disabled
                      className="block w-full p-2 rounded-lg shadow-sm"
                    />
                    <Lock
                      className="absolute right-3 top-2 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="block w-full p-2  rounded-lg border-gray-300 bg-gray-50 shadow-sm"
                    />
                    <Mail
                      className="absolute right-3 top-2 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>
              </div>

              {/* Editable fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 bg- gap-6">
                <div className="space-y-2 ">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="relative w-full ">
                    <input
                      type="text"
                      value={profile.address}
                      onChange={handleChange}
                      name="address"
                      className="block rounded-lg w-[100%] bg-gray-100 p-1 shadow-sm"
                      placeholder="Enter your address"
                    />
                    <MapPin
                      className="absolute right-3 top-2 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="number"
                    name="zipCode"
                    value={profile.zipCode}
                    onChange={handleChange}
                    className="block w-full rounded-lg bg-gray-100 p-1 border-gray-300 shadow-sm "
                    placeholder="Enter ZIP code"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    UGC Code
                  </label>
                  <input
                    type="text"
                    name="UGCcode"
                    value={profile.UGCcode}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-gray-300 bg-gray-100 p-1 shadow-sm "
                    placeholder="Enter UGC code"
                  />
                </div>
              </div>

              {!isUpdating && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-gray-400 font-bold text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Save and Submit
                  </button>
                </div>
              )}

              {isUpdating && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-400 font-bold text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Updating...
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UniEditProfile;
