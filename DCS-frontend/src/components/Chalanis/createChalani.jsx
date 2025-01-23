import React, { useState, useEffect } from "react";
import { createChalanis } from "./utils/api";
import DateInput from "../home/UI/Datepicker";
import FetchLatestId from "./latestId";

const CreateChalaniForm = () => {
  const [chalaniNo, setChalaniNo] = useState("");
  const [formData, setFormData] = useState({
    subject: "",
    receiver_name: "",
    chalani_no: "",
    sent_date: "",
    remarks: "",
    status: "Pending",
    document_file: null,
    related_office: "",
  });
  const [officeTypes, setOfficeTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  

  useEffect(() => {
    fetch("api/v1/office_type/")
      .then((response) => response.json())
      .then((data) => {
        setOfficeTypes(data);
      })
      .catch((error) => {
        console.error("Error fetching office types:", error);
        setErrorMessage("Error fetching office types. Please try again later.");
      });
  }, []);

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

  const handleOfficeTypeChange = (e) => {
    const selectedTypeId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      related_office: selectedTypeId, 
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
      setModalOpen(true);
    } catch (error) {
      console.error("Error during Chalani creation:", error.message || error);
      setErrorMessage("Error creating Chalani. Please try again.");
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const InputField = ({ label, name, type, value, onChange, required, placeholder, ...props }) => (
    <div className="flex">
      <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </div>
  );


  const TextAreaField = ({ label, name, value, onChange, required, placeholder }) => (
    <div className="flex">
      <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder={placeholder}
        rows="3"
        required={required}
      ></textarea>
    </div>
  );

  const SelectField = ({ label, name, value, onChange, required, options }) => (
    <div className="flex">
      <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required={required}
      >
        <option value="">Select Related Office</option>
        {options.map((type) => (
          <option key={type.id} value={type.id}>
            {type.type_name}
          </option>
        ))}
      </select>
    </div>
      );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-8">Create Chalani</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <FetchLatestId onChalaniNoFetched={handleChalaniNoFetched} />
        <InputField
          label="चलानी नं"
          name="chalaniNo"
          type="text"
          value={chalaniNo}
          onChange={handleChange}
          required={false}
          readOnly
        />
        <InputField
          label="विषय"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          required
          placeholder="Subject"
        />
        <InputField
          label="Receiver Name"
          name="receiver_name"
          type="text"
          value={formData.receiver_name}
          onChange={handleChange}
          required
          placeholder="Receiver Name"
        />
        <DateInput
          id="sent_date"
          name="sent_date"
          value={formData.sent_date}
          onChange={handleDateChange}
          className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
        <SelectField
          label="Related Office"
          name="related_office"
          value={formData.related_office}
          onChange={handleOfficeTypeChange}
          required
          options={officeTypes}
        />
        <TextAreaField
          label="Remarks"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          required
          placeholder="Add remarks..."
        />
        <div className="flex">
          <label className="block text-md font-semibold text-gray-700 p-3 w-1/6">Document File</label>
          <input
            type="file"
            name="document_file"
            onChange={handleChange}
            className="mt-2 w-3/4 p-1"
  
          />
        </div>
        {errorMessage && (
          <div className="mb-4 text-red-600 text-sm font-medium">{errorMessage}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
        >
          Create Chalani
        </button>
      </form>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-lg font-bold mb-4">Success</h2>
            <p className="text-gray-700 mb-6">Chalani created successfully!</p>
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

export default CreateChalaniForm;
