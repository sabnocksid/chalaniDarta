import React, { useState, useEffect } from 'react';

const Home = () => {
  const [totalDarta, setTotalDarta] = useState(null);
  const [totalChalani, setTotalChalani] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch('/api/v1/dashboard')
    .then((response) => response.json())
    .then((data) => {
      setTotalDarta(data.total_darta);
      setTotalChalani(data.total_chalani);
      setTableData(data.tableData || []);
    })
    .catch((error) => console.error('Error fetching data:', error));
  }, []);  

  return (
    <div className="max-h-full p-10">
      <h1 className="font-semibold">ड्यासबोर्डमा स्वागत छ</h1>

      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th>
              <select className="custom-select">
                <option value="">कागजातको अपलोड</option>
                <option value="">कुल दर्ता: {totalDarta}</option>
                <option value="">कुल चलानी: {totalChalani}</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.length === 0 ? (
            <tr>
              <td className="border px-4 py-2" colSpan="1">
                No records found
              </td>
            </tr>
          ) : (
            tableData.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
