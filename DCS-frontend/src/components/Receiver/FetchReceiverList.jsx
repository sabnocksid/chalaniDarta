import React, { useState, useEffect } from "react";
import { FaTimes } from 'react-icons/fa';
const FetchReceiverList = ({ onReceiverChange }) => {
    const [data, setData] = useState([]);
    const [selectedOffices, setSelectedOffices] = useState([]);
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch("api/v1/receiver_office/")
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          if (Array.isArray(json)) {
            setValues(json);
          } else {
            setError("Data format is incorrect. Expected an array.");
          }
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching data.");
          setLoading(false);
        });
    }, []);
  
    useEffect(() => {
      onReceiverChange(selectedOffices.map((office) => office.id).join(", "));
    }, [selectedOffices, onReceiverChange]);
  
    if (loading) {
      return <p  className="mt-2 w-3/4 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">Loading...</p>;
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
      <div className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
        <select
        onChange={(e) => {
            const selectedId = e.target.value;
            const selectedName = e.target.selectedOptions[0].text;
            handleSelect(selectedId, selectedName);
          }}
          value=""
          className="w-full"
        >
          <option value="">Select Office</option>
          {values.length > 0 ? (
            values.map((item) => (
              <option key={item.id} value={item.name} >
                {item.name}
              </option>
            ))
          ) : (
            <option disabled>No values found</option>
          )}
        </select>
        <div className="mt-4">
          {selectedOffices.length > 0 && (
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
          )}
        </div>
      </div>
    );
  };
  
  export default FetchReceiverList;
  