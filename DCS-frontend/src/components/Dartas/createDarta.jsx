import React, { useState } from "react";
import axiosInstance from "./utils/axios";

const CreateDarta = () => {
  const [formData, setFormData] = useState({
    subject: "",
    sender_name: "",
    received_date: "",
    letter_no: "",
    letter_date: "",
    document_type: null,
    document_file: null,
    status: "Pending",
    sender_office: null,
    receiver_office: null,
  });

  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const validateForm = () => {
    const errors = [];
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "document_file") {
        errors.push(`${key.replace("_", " ")} is required.`);
      }
    });
    if (!formData.document_file) {
      errors.push("Document file is required.");
    }
    setErrorMessages(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        data.append(key, formData[key]);
      } else {
        data.append(key, null);
      }
    });

    try {
      await axiosInstance.post("/darta/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Darta created successfully!");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(
        `Failed to create Darta: ${JSON.stringify(
          error.response?.data || error.message
        )}`
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">Create Darta</h1>
      {errorMessages.length > 0 && (
        <div className="bg-red-100 text-red-600 p-4 mb-4 rounded-md">
          <ul className="list-disc pl-6">
            {errorMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sender Name
          </label>
          <input
            type="text"
            name="sender_name"
            value={formData.sender_name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Received Date
          </label>
          <input
            type="datetime-local"
            name="received_date"
            value={formData.received_date}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Letter No
          </label>
          <input
            type="text"
            name="letter_no"
            value={formData.letter_no}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Letter Date
          </label>
          <input
            type="datetime-local"
            name="letter_date"
            value={formData.letter_date}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Document Type
          </label>
          <select
            name="document_type"
            value={formData.document_type}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={null}>Select Document Type</option>
            {/* Add other options here */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Document File
          </label>
          <input
            type="file"
            name="document_file"
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sender Office
          </label>
          <select
            name="sender_office"
            value={formData.sender_office}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={null}>Select Sender Office</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Receiver Office
          </label>
          <select
            name="receiver_office"
            value={formData.receiver_office}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={null}>Select Receiver Office</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreateDarta;
