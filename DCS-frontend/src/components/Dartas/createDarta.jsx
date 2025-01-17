import React, { useState, useEffect } from 'react';
import axiosInstance from "./utils/axios";
import DateInput from "../home/UI/Datepicker";
import FetchSenderList from "../Sender/SenderList";
import FetchReceiverList from "../Receiver/FetchReceiverList";
import NepaliDate from 'nepali-date';

const CreateDarta = () => {

  const [formData, setFormData] = useState({
    subject: "",
    sender_name: "",
    received_date: "",
    letter_no: "",
    letter_date: "",
    document_type: "",
    document_file: "",
    status: "Pending",
    sender_office: "",
    receiver_office: "",
  });

  const [nepaliDate, setNepaliDate] = useState('');

  useEffect(() => {
    const today = new NepaliDate();
    setNepaliDate(today.format('YYYY-MM-DD'));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files, selectedOptions } = e.target;
    
  
    if (type === "select-multiple") {
      setFormData((prev) => ({
        ...prev,
        [name]: Array.from(selectedOptions).map((option) => option.value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "file" ? files[0] : value,
      }));
    }
  };

  const handleDateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      received_date: e.target.value,
      letter_date: e.target.value,
    }));
  };

  const handleReceiverChange = (receiverOffices) => {
    setFormData((prev) => ({
      ...prev,
      receiver_office: receiverOffices,
    }));
  };

  const handleSenderChange = (senderOffices) => {
    setFormData((prev) => ({
      ...prev,
      sender_office: senderOffices,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        data.append(key, formData[key]);
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
      alert(`Failed to create Darta: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">Create Darta</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <label className="block text-sm font-bold text-gray-700">दर्ता नं</label>
          
          <input
            type="text"
            name="DartaNo"
            value={formData.subject}
            onChange={handleChange}
            placeholder='99999'
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sender Name</label>
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
          <label className="block text-sm font-medium text-gray-700">Received Date</label>
          <DateInput
            id="received_date"
            name="received_date"
            value={formData.received_date}
            onChange={handleDateChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Letter No</label>
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
          <label className="block text-sm font-medium text-gray-700">Letter Date</label>
          <input
            id="letter_date"
            name="letter_date"
            value={nepaliDate}
            onChange={handleDateChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Document Type</label>
          <select
            name="document_type"
            value={formData.document_type}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Document Type</option>
            <option value="1">Type 1</option>
            <option value="2">Type 2</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Document File</label>
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
            <option value="Sent">Sent</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sender Office</label>
              <FetchSenderList onSenderChange={handleSenderChange} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Receiver Office</label>
          <FetchReceiverList onReceiverChange={handleReceiverChange} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Save
        </button>
      </form>
    </div>
  
  );
};

export default CreateDarta;
