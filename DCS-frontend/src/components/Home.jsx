import React, { useState, useEffect } from 'react';
import { FaFile,FaBook } from "react-icons/fa";

const Home = () => {
  const [totalDarta, setTotalDarta] = useState(null);
  const [totalChalani, setTotalChalani] = useState(null);

  useEffect(() => {
    fetch('/api/v1/dashboard')
      .then((response) => response.json())
      .then((data) => {
        setTotalDarta(data.total_darta);
        setTotalChalani(data.total_chalani);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="max-h-full p-10 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center bg-white shadow-lg rounded-md overflow-hidden">
          <div className="flex items-center justify-center w-1/4 h-full bg-red-500 text-white text-3xl">
            <FaFile />
          </div>
          <div className="px-6 py-3">
            <h2 className="text-gray-700 text-md font-medium">कुल दर्ता</h2>
            <p className="text-black text-lg font-bold">{totalDarta ?? 'Loading...'} </p>
            <a href="/darta" className='text-sm text-blue-500'>Show List</a>
          </div>
        </div>
        <div className="flex items-center bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-center w-1/4 h-full bg-blue-500 text-white text-3xl">
            <FaBook />
          </div>
          <div className="px-6 py-3">
            <h2 className="text-gray-700 text-md font-medium">कुल चलानी</h2>
            <p className="text-black text-lg font-bold">{totalChalani ?? 'Loading...'}</p>
            <a href="/chalani" className='text-sm text-blue-500'>Show List</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
