import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Lock, Mail, MapPin, Upload, X, Link as LinkIcon } from "lucide-react";
import { UniversityNavbar } from "./UniversityNavbar";

const UniEditProfile = () => {
  const [profile, setProfile] = useState({
    name: "University Name",
    email: "university@example.com",
    address: "",
    zipCode: "",
    photo: null,
    photoUrl:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop&crop=entropy",
  });

  const [isAddressLocked, setIsAddressLocked] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(profile.photoUrl);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setProfile({ ...profile, photo: file });
      };
      reader.readAsDataURL(file);
      toast.success("Profile photo updated");
    }
  };

  const handlePhotoUrlChange = (e) => {
    const url = e.target.value;
    setProfile({ ...profile, photoUrl: url });
    setPreviewUrl(url);
  };

  const removePhoto = () => {
    const defaultPhoto =
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop&crop=entropy";
    setPreviewUrl(defaultPhoto);
    setProfile({ ...profile, photo: null, photoUrl: defaultPhoto });
    toast.success("Profile photo removed");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAddressLocked(true);
    toast.success("Profile updated successfully");
  };

  const requestChange = (field) => {
    toast.success(
      `Change request for ${field} has been submitted. We'll contact you soon.`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <UniversityNavbar />
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">
              University Profile
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-8">
              {/* Profile Photo Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  {(profile.photo ||
                    profile.photoUrl !==
                      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop&crop=entropy") && (
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <div className="flex flex-col w-full max-w-md space-y-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Photo URL
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={profile.photoUrl}
                        onChange={handlePhotoUrlChange}
                        className="block w-full rounded-lg border-gray-300 shadow-sm pr-10"
                        placeholder="Enter image URL"
                      />
                      <LinkIcon
                        className="absolute right-3 top-2.5 text-gray-400"
                        size={20}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="px-4 text-gray-500">or</span>
                  </div>
                  <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <Upload size={20} />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Non-editable fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={profile.name}
                      disabled
                      className="block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm"
                    />
                    <Lock
                      className="absolute right-3 top-2.5 text-gray-400"
                      size={20}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => requestChange("name")}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Request Change
                  </button>
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
                      className="block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm"
                    />
                    <Mail
                      className="absolute right-3 top-2.5 text-gray-400"
                      size={20}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => requestChange("email")}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Request Change
                  </button>
                </div>
              </div>

              {/* Editable fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) =>
                        setProfile({ ...profile, address: e.target.value })
                      }
                      disabled={isAddressLocked}
                      className={`block w-full rounded-lg border-gray-300 shadow-sm ${
                        isAddressLocked ? "bg-gray-50" : ""
                      }`}
                      placeholder="Enter your address"
                    />
                    <MapPin
                      className="absolute right-3 top-2.5 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={profile.zipCode}
                    onChange={(e) =>
                      setProfile({ ...profile, zipCode: e.target.value })
                    }
                    disabled={isAddressLocked}
                    className={`block w-full rounded-lg border-gray-300 shadow-sm ${
                      isAddressLocked ? "bg-gray-50" : ""
                    }`}
                    placeholder="Enter ZIP code"
                  />
                </div>
              </div>

              {!isAddressLocked && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save and Submit
                  </button>
                </div>
              )}

              {isAddressLocked && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => requestChange("address and ZIP code")}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Request Address Change
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
