import React, { useState, useEffect } from "react";
import { createSender, fetchOfficeTypes } from "./utils/api";

const AddSenderModal = ({ isOpen, onClose }) => {
  const [officeTypes, setOfficeTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact: "",
    type: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const types = await fetchOfficeTypes();
        setOfficeTypes(types);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch office types.");
        setLoading(false);
      }
    };
    fetchTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.contact || !formData.type) {
      setErrorMessage("All fields are required.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("type", formData.type);

    try {
      await createSender(formDataToSend);
      alert("Sender added successfully!");
      setFormData({
        name: "",
        location: "",
        contact: "",
        type: "",
      });
      setErrorMessage(""); // Clear the error message on success
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding sender:", error);
      setErrorMessage("Error adding sender. Please try again.");
    }
  };

  const handleModalClose = () => {
    setErrorMessage(""); // Clear the error message when closing the modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
          Add Sender
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex">
            <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Sender Name"
              required
            />
          </div>

          <div className="flex">
            <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Location"
              required
            />
          </div>

          <div className="flex">
            <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
              Contact
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Contact Number"
              required
            />
          </div>

          <div className="flex">
            <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Type</option>
              {loading ? (
                <option>Loading...</option>
              ) : error ? (
                <option>Error loading types</option>
              ) : (
                officeTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.type_name}
                  </option>
                ))
              )}
            </select>
          </div>

          {errorMessage && (
            <div className="mb-4 text-red-600 text-sm font-medium">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleModalClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Add Sender
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSenderModal;
