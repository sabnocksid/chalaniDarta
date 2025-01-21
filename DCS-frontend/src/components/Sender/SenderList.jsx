import React, { useState, useEffect } from "react";
import { FaTimes } from 'react-icons/fa';
import AddSenderModal from "./AddSender"; // Make sure this import path is correct

const FetchSenderList = ({ onSenderChange }) => {
  const [data, setData] = useState([]);
  const [selectedOffices, setSelectedOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  useEffect(() => {
    fetch("api/v1/sender_office/")
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json)) {
          setData(json);
        } else {
          setError("Data format is incorrect. Expected an array.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching data.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    onSenderChange(selectedOffices.map((office) => office.id).join(", "));
  }, [selectedOffices, onSenderChange]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleSelect = (id, name) => {
    if (!selectedOffices.some((office) => office.id === id)) {
      setSelectedOffices([...selectedOffices, { id, name }]);
    }
  };

  const handleClear = (id) => {
    setSelectedOffices(selectedOffices.filter((office) => office.id !== id));
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <select
          onChange={(e) => {
            const selectedId = e.target.value;
            const selectedName = e.target.selectedOptions[0].text;
            handleSelect(selectedId, selectedName);
          }}
          value=""
        >
          <option value="">Select Office</option>
          {data.length > 0 ? (
            data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))
          ) : (
            <option disabled>No values found</option>
          )}
        </select>

        {/* Add Sender Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Add Sender
        </button>
      </div>

      {/* Selected Offices List */}
      {selectedOffices.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {selectedOffices.map((office) => (
              <div
                key={office.id}
                className="flex items-center bg-blue-700 text-white text-xs px-2 py-1 rounded-md"
              >
                <span>{office.name}</span>
                <button
                  onClick={() => handleClear(office.id)}
                  className="ml-2 text-white hover:text-red-500"
                  title="Clear Selection"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <AddSenderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default FetchSenderList;
