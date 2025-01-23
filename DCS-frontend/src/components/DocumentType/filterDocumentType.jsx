import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTh } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NepaliDate from 'nepali-date';

const FilterDocumentType = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rowsPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/v1/darta/');
        setTableData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterByDocumentType = (type) => {
    setSelectedType(type);
    const filtered = type === 'All' ? tableData : tableData.filter((item) => item.document_type === type);
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const formatNepaliDate = (date) => new NepaliDate(new Date(date)).format('YYYY-MM-DD');

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const documentTypes = Array.from(new Set(tableData.map((item) => item.document_type))).sort();

  return (
    <div className="max-h-full p-5">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="mb-4">
  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => filterByDocumentType('All')}
      className={`py-1 px-3 rounded-md font-bold ${
        selectedType === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
      }`}
    >
      All
    </button>
    {documentTypes.map((docType) => (
      <button
        key={docType}
        onClick={() => filterByDocumentType(docType)}
        className={`py-1 px-3 rounded-md font-bold ${
          selectedType === docType ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        {docType}
      </button>
    ))}
  </div>
</div>

          <div className="w-100 mt-2">
            <table className="w-full bg-slate-300">
              <thead>
                <tr className="h-10">
                  <th className="w-14 p-6 col-span-1">
                    <FaTh />
                  </th>
                  <th className="text-left p-5 col-span-7">दर्ता सूचीकरण</th>
                </tr>
              </thead>
            </table>

            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300 text-xs">
                <thead>
                  <tr className="bg-slate-300">
                    <th className="border px-4 py-2">क्र.स.</th>
                    <th className="border px-4 py-2">विषय (Subject)</th>
                    <th className="border px-4 py-2">पठाउने व्यक्तिको नाम (Sender's Name)</th>
                    <th className="border px-4 py-2">प्राप्त मिति (Received Date)</th>
                    <th className="border px-4 py-2">पत्र नं (Letter no.)</th>
                    <th className="border px-4 py-2">पत्र मिति (Letter Date)</th>
                    <th className="border px-4 py-2">डॉकुमेन्ट प्रकार (Document Type)</th>
                    <th className="border px-4 py-2">स्थिति (Status)</th>
                    <th className="border px-4 py-2">पठाउने कार्यालयको नाम(Sender Office)</th>
                    <th className="border px-4 py-2">प्राप्तकर्ता कार्यालयको नाम(Receiver Office)</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.length > 0 ? (
                    currentRows.map((item, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{item.id}</td>
                        <td className="border px-4 py-2">{item.subject || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.sender_name || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.received_date || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.letter_no || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.letter_date || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.document_type || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.status || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.sender_office || 'N/A'}</td>
                        <td className="border px-4 py-2">{item.receiver_office || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border px-4 py-2 text-center" colSpan="10">
                        कुनै रेकर्ड फेला परेन (No Records Found)
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex w-full h-10 mt-10">
              <button
                className={`text-gray-400 font-bold py-1 px-3 ml-2 rounded-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`py-1 px-3 ml-2 rounded-lg font-bold ${currentPage === i + 1 ? 'bg-cyan-500 text-white' : ' hover:bg-gray-400'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className={`text-gray-400 font-bold py-1 px-3 ml-2 rounded-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
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

export default FilterDocumentType;
