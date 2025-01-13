import React, { useState } from 'react';
import { createDarta } from './utils/api'; 

const AddDarta = () => {
  const [formData, setFormData] = useState({
    year: '',
    dartaNo: '',
    topic: '',
    sendOffice: '',
    date: '',
    remark: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createDarta(formData)
      .then((data) => {
        console.log("Darta created:", data);
      })
      .catch((error) => {
        console.error("Error creating Darta:", error);
      });
  };

  return (
    <div>
      <h2>Add Darta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year"
        />
        <input
          type="text"
          name="dartaNo"
          value={formData.dartaNo}
          onChange={handleChange}
          placeholder="Darta No"
        />
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          placeholder="Topic"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddDarta;
