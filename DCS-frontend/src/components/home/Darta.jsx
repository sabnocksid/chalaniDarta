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
        // axios.defaults.baseURL = 'https://darta.bimal1412.com.np'; 
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

                  <div className="w-100 mt-2">
                    <table className="w-full bg-slate-300">
                      <thead>
                        <tr className="h-10">
                          <th className="w-14 p-6 col-span-1">
                            <FaTh />
                          </th>
                          <th className="text-left p-5 col-span-7">दर्ता सूचीकरण</th>
                          <th className="col-span-1 ml-5">
                            <button onClick={handlePrint} className="bg-green-600 text-white text-xs p-2 rounded-md">
                              Print
                            </button>
                          </th>
                        </tr>
                      </thead>
                    </table>
          <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 text-xs">
  <thead>
    <tr className='bg-slate-300'>
      <th className="border px-4 py-2">क्र.स.</th>
      <th className="border px-4 py-2">विषय (Subject)</th>
      <th className="border px-4 py-2">पठाउने व्यक्तिको नाम (Sender's Name)</th>
      <th className="border px-4 py-2">प्राप्त मिति (Received Date)</th>
      <th className="border px-4 py-2">पत्र नं (Letter no.)</th>
      <th className="border px-4 py-2">पत्र मिति (Letter Date)</th>
      <th className="border px-4 py-2">डॉकुमेन्ट प्रकार (Document Type)</th>
      <th className="border px-4 py-2">डॉकुमेन्ट फाइल (Document File)</th>
      <th className="border px-4 py-2">स्थिति (Status)</th>
      <th className="border px-4 py-2">पठाउने कार्यालयको नाम(Sender Office)</th>
      <th className="border px-4 py-2">प्राप्तकर्ता कार्यालयको नाम(Receiver Office)</th>
      <th className="border px-4 py-2">कार्य (Actions)</th>
    </tr>
  </thead>
  <tbody>
    {currentRows.length > 0 ? (
      currentRows.map((item, index) => (
        <tr key={index}>
          <td className="border px-4 py-2">{index + 1}</td>
          <td className="border px-4 py-2">{item.subject || 'N/A'}</td>
          <td className="border px-4 py-2">{item.sender_name || 'N/A'}</td>
          <td className="border px-4 py-2">{item.received_date || 'N/A'}</td>
          <td className="border px-4 py-2">{item.letter_no || 'N/A'}</td>
          <td className="border px-4 py-2">{item.letter_date || 'N/A'}</td>
          <td className="border px-4 py-2">{item.document_type || 'N/A'}</td>
          <td className="border px-4 py-2">{item.document_file || 'N/A'}</td>
          <td className="border px-4 py-2">{item.status || 'N/A'}</td>
          <td className="border px-4 py-2">{item.sender_office || 'N/A'}</td>
          <td className="border px-4 py-2">{item.receiver_office || 'N/A'}</td>
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
</div>



  {/* Pagination */}
  <div className="flex w-100 h-10 mt-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`py-1 px-3 ml-2 rounded-lg font-bold ${
              currentPage === i + 1
                ? 'bg-cyan-500 text-white'
                : ' hover:bg-gray-400'
            }`}
          >
            {i + 1}
          </button>
        ))}
       <div className="items-center mt-1 space-x-2">
       <button
              className={` text-gray-400 font-bold py-1 px-3 ml-2 rounded-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className={`text-gray-400 font-bold py-1 px-3 rounded-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
        </div>
      </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Darta;
