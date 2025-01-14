import React, { useState } from 'react';

const Home = () => {
  const [tableData, setTableData] = useState([]);

  return (
    <div className="max-h-full p-10">
      <h1 className="font-semibold">ड्यासबोर्डमा स्वागत छ</h1>

      <table className="table-auto w-full mt-4">
      <th>
            <select className="custom-select">
               <option value="">कागजातको अपलोड</option>
               <option value="option1">Option 1</option>
               <option value="option2">Option 2</option>
           </select>
        </th>
        <tbody>
          {tableData.length === 0 ? (
            <tr>
              <td className="border px-4 py-2" colSpan="1">
                No records found
              </td>
            </tr>
          ) : (
            <>
              <thead>
                <tr>
                  <th className="border px-4 py-2">नाम</th>
                </tr>
              </thead>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.name}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

//https://darta.bimal1412.com.np/api/v1/dashboard
