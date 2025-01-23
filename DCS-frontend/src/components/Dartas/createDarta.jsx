import React, { useState, useEffect } from 'react';
import axiosInstance from "./utils/axios";
import DateInput from "../home/UI/Datepicker";
import FetchReceiverList from "../Receiver/FetchReceiverList";
import FetchSenderList from "../Sender/SenderList";
import NepaliDate from 'nepali-date';
import FetchLatestId from './latestId';
import { createDarta } from "./utils/api";
import axios from 'axios';

const CreateDarta = () => {
  const [formData, setFormData] = useState({
    subject: "",
    sender_name: "",
    remarks: "",
    received_date: "",
    letter_no: "",
    letter_date: "",
    document_type: "",
    document_file: "",
    status: "",
    sender_office: "",
    receiver_office: "",
  });

  const [nepaliDate, setNepaliDate] = useState('');
  const [dartaNo, setDartaNo] = useState('');
  const [senders, setSenders] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDartaNoFetched = (newDartaNo) => {
    setDartaNo(newDartaNo);
  };

  useEffect(() => {
    const today = new NepaliDate();
    setNepaliDate(today.format('YYYY-MM-DD'));

    const fetchSenderData = async () => {
      try {
        const response = await axios.get('/api/v1/sender_office/');
        setSenders(response.data);
      } catch (error) {
        console.error("Error fetching sender data:", error);
        setError("Failed to fetch sender data");
      }
    };

    fetchSenderData();
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

  const handleSenderOfficeChange = (senderOffices) => {
    console.log('Selected sender office:', senderOffices);
    setFormData((prev) => ({
      ...prev,
      sender_office: senderOffices,
    }));
  };

  const handleSenderChange = (senderOffices, senderName) => {
    setFormData((prev) => ({
      ...prev,
      sender_office: senderOffices,
      sender_name: senderName,  
    }));
  };

  const handleReceiverChange = (receiverOffices, receiverName) => {
    setFormData((prev) => ({
      ...prev,
      receiver_office: receiverOffices,
      receiver_name: receiverName,  
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        formToSubmit.append(key, formData[key]);
      }
    });
  
    try {
      const response = await createDarta(formToSubmit);
      console.log("Darta created successfully:", response);
      setModalOpen(true);
    } catch (error) {
      console.error("Error during Darta creation:", error.message || error);
      setError("Error creating Darta. Please try again.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
        Create Darta
      </h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <FetchLatestId onDartaNoFetched={handleDartaNoFetched} />

        <div className='flex'>
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            दर्ता नं
          </label>
          <input
            type="text"
            name="dartaNo"
            value={dartaNo}
            onChange={handleChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            readOnly
          />
        </div>

        <div className='flex'>
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            दर्ता मिति
          </label>
          <input
            id="letter_date"
            name="letter_date"
            value={nepaliDate}
            onChange={handleDateChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            readOnly
          />
        </div>

        <div className='flex'>
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            पठाउने कार्यालय
          </label>
          <FetchSenderList
            type="text"
            name="sender_office"
            value={formData.sender_office}
            onChange={handleChange}
            required
            onSenderChange={handleSenderOfficeChange}
          />
        </div>

        <div className='flex'>
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            पठाउने व्यक्ति 
          </label>
          <input
            type="text"
            name="sender_name"  
            value={formData.sender_name}
            onChange={handleChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder='Sender Name'
            required
          />
        </div>

        <DateInput
          id="received_date"
          name="received_date"
          value={formData.received_date}
          onChange={handleDateChange}
          className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />

        <div className='flex'>
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            विषय
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder='Subject'
            required
          />
        </div>

        <div className='flex'>
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            पत्र नं
          </label>
          <input
            type="text"
            name="letter_no"
            value={formData.letter_no}
            onChange={handleChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder='Letter Number'
            required
          />
        </div>

        <div className="flex">
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/8">
            डॉकुमेन्ट प्रकार
          </label>
          <select
            name="document_type"
            value={formData.document_type}
            onChange={handleChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Document Type</option>
            <option value="पत्र">पत्र</option>
            <option value="टिप्पणी">टिप्पणी</option>
          </select>
        </div>

        <div className="flex">
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            स्थिति
          </label>
          <div className="mt-2 p-1 w-3/4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <select name="status" onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Processed">Processed</option>
            </select>
          </div>
        </div>

        <div className='flex'>
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            प्राप्तकर्ता कार्यालय
          </label>
          <div className="mt-2 w-3/4">
            <FetchReceiverList
              type="text"
              name="receiver_name"
              value={formData.receiver_name}
              onChange={handleChange}
              required
              onReceiverChange={handleReceiverChange}
            />
          </div>
        </div>

        <div className='flex'>
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">
            टिप्पणी
          </label>
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder='Remarks'
            required
          />
        </div>

        <div className='flex'>
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/8">
            डॉकुमेन्ट फाइल
          </label>
          <input
            type="file"
            name="document_file"
            onChange={handleChange}
            className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
        >
          Save
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-bold mb-4">Success</h2>
            <p className="text-gray-700 mb-6">Darta created successfully!</p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateDarta;
