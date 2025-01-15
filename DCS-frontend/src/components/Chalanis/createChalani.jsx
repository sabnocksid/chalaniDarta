import React, { useState } from "react";
import { createChalanis } from "./utils/api";
import DateInput from "../home/UI/Datepicker";

const CreateChalaniForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    receiver_name: "",
    sent_date: "",
    document_type: "",
    status: "",
    document_file: null,
    related_office: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleDateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      sent_date: e.target.value,  
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formToSubmit = new FormData();

    Object.keys(formData).forEach((key) => {
      formToSubmit.append(key, formData[key]);
    });

    try {
      const response = await createChalanis(formToSubmit);
      console.log("Chalani created successfully:", response);
      alert("Chalani created successfully!");
    } catch (error) {
      console.error("Error during Chalani creation:", error.message || error);
      setErrorMessage("Error creating Chalani. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Create Chalani
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="receiver_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Receiver Name
          </label>
          <input
            type="text"
            id="receiver_name"
            name="receiver_name"
            value={formData.receiver_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="sent_date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sent Date
          </label>
          <DateInput
            id="sent_date"
            name="sent_date"
            value={formData.sent_date}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="document_type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Document Type
          </label>
          <input
            type="number"
            id="document_type"
            name="document_type"
            value={formData.document_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="document_file"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Document File
          </label>
          <input
            type="file"
            id="document_file"
            name="document_file"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="related_office"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Related Office
          </label>
          <input
            type="number"
            id="related_office"
            name="related_office"
            value={formData.related_office}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-600 text-sm font-medium">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Create Chalani
        </button>
      </form>
    </div>
  );
};

export default CreateChalaniForm;
