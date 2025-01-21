import React, { useState } from "react";
import { createChalanis } from "./utils/api";
import DateInput from "../home/UI/Datepicker";
import FetchLatestId from './latestId';
import FetchReceiverList from "../Receiver/FetchReceiverList";

const CreateChalaniForm = () => {
  const [chalaniNo, setChalaniNo] = useState("");
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

  const handleChalaniNoFetched = (newChalaniNo) => {
    setChalaniNo(newChalaniNo);
  };

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

  const handleReceiverChange = (receiverOffices) => {
    setFormData((prev) => ({
      ...prev,
      related_office: receiverOffices,
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
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
        Create Chalani
      </h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <FetchLatestId onChalaniNoFetched={handleChalaniNoFetched} />
        <div className="flex">
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            चलानी नं
          </label>
          <input
            type="text"
            name="chalaniNo"
            value={chalaniNo}
            onChange={handleChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            readOnly
          />
        </div>

        <div className="flex">
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            विषय
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Subject"
            required
          />
        </div>

        <div className="flex">
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            Receiver Name
          </label>
          <input
            type="text"
            name="receiver_name"
            value={formData.receiver_name}
            onChange={handleChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Receiver Name"
            required
          />
        </div>

        <div className="flex">
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            Sent Date
          </label>
          <DateInput
            id="sent_date"
            name="sent_date"
            value={formData.sent_date}
            onChange={handleDateChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="flex">
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            Document Type
          </label>
          <select
            name="document_type"
            value={formData.document_type}
            onChange={handleChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">Select Document Type</option>
            <option value="1">Type 1</option>
            <option value="2">Type 2</option>
          </select>
        </div>

        <div className="flex">
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="flex">
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            Related Office
          </label>
          <FetchReceiverList
            onReceiverChange={handleReceiverChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="flex">
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            Document File
          </label>
          <input
            type="file"
            name="document_file"
            onChange={handleChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-600 text-sm font-medium">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
        >
          Create Chalani
        </button>
      </form>
    </div>
  );
};

export default CreateChalaniForm;
