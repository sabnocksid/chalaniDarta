import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTh } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Darta = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rowsPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/darta/');
        setTableData(response.data);
        setLoading(false);
      } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        setError(errorMessage); 
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrint = () => window.print();

  return (
    <div className="max-h-full p-5">
      {loading && !error ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="ButtonGroup flex">
            <Link to="/addDarta">
              <button className="bg-blue-500 text-white p-2 rounded-sm text-xs">थप्नुहोस्</button>
            </Link>
            <a href="#getDarta">
              <button className="bg-blue-500 text-white p-2 ml-3 rounded-sm text-xs">प्राप्त</button>
            </a>
            <a href="#DartaPartibedan">
              <button className="bg-blue-500 text-white p-2 ml-3 rounded-sm text-xs">दर्ता प्रतिवेदन खोज</button>
            </a>
          </div>

          <div className="p-4 bg-slate-100 mt-4 shadow-sm">
          <table className="table-auto w-full border-collapse border border-gray-300 text-xs">
  <thead>
    <tr className='bg-slate-300'>
      <th className="border px-4 py-2">क्र.स.</th>
      <th className="border px-4 py-2">विषय (Subject)</th>
      <th className="border px-4 py-2">प्रापकको नाम (Receiver Name)</th>
      <th className="border px-4 py-2">पठाइएको मिति (Sent Date)</th>
      <th className="border px-4 py-2">डॉकुमेन्ट प्रकार (Document Type)</th>
      <th className="border px-4 py-2">स्थिति (Status)</th>
      <th className="border px-4 py-2">डॉकुमेन्ट फाइल (Document File)</th>
      <th className="border px-4 py-2">संबंधित कार्यालय (Related Office)</th>
      <th className="border px-4 py-2">कार्य (Actions)</th>
    </tr>
  </thead>
  <tbody>
    {currentRows.length > 0 ? (
      currentRows.map((item, index) => (
        <tr key={index}>
          <td className="border px-4 py-2">{index + 1}</td>
          <td className="border px-4 py-2">{item.subject || 'N/A'}</td>
          <td className="border px-4 py-2">{item.receiver_name || 'N/A'}</td>
          <td className="border px-4 py-2">{item.sent_date || 'N/A'}</td>
          <td className="border px-4 py-2">{item.document_type || 'N/A'}</td>
          <td className="border px-4 py-2">{item.status || 'N/A'}</td>
          <td className="border px-4 py-2">
            {item.document_file ? (
              <a href={item.document_file} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                View File
              </a>
            ) : (
              'N/A'
            )}
          </td>
          <td className="border px-4 py-2">{item.related_office || 'N/A'}</td>
          <td className="border px-4 py-2">
            <button className="bg-blue-500 text-white font-bold p-1">View</button>
            <button className="bg-green-500 text-white font-bold p-1 ml-2">Done</button>
            <button className="bg-red-500 text-white font-bold p-1 ml-2">Delete</button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td className="border px-4 py-2 text-center" colSpan="9">
          कुनै रेकर्ड फेला परेन (No Records Found)
        </td>
      </tr>
    )}
  </tbody>
</table>


            {/* Pagination */}
            <div className="flex w-full justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="py-1 px-3 mx-1 rounded-lg font-bold disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`py-1 px-3 mx-1 rounded-lg font-bold ${
                    currentPage === i + 1 ? 'bg-cyan-500 text-white' : 'hover:bg-gray-400'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="py-1 px-3 mx-1 rounded-lg font-bold disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Darta;
