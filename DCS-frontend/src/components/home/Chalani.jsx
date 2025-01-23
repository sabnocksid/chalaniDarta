import React, { useState, useEffect } from 'react';
import { FaTh } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Chalani = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rowsPerPage = 2;

  useEffect(() => {
    fetch('/api/v1/chalani/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTableData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrint = () => window.print();

  return (
    <div className="p-5 max-h-full">
      <div className="flex ButtonGroup">
        <Link to="/addChalani">
          <button className="bg-blue-500 text-white p-2 rounded-sm text-xs">थप्नुहोस्</button>
        </Link>
        <button className="bg-blue-500 text-white p-2 ml-3 rounded-sm text-xs">प्राप्त</button>
        <button className="bg-blue-500 text-white p-2 ml-3 rounded-sm text-xs">चलानी प्रतिवेदन खोज</button>
      </div>

      <div className="bg-slate-100 mt-2 shadow-sm">
        <table className="w-full bg-slate-300">
          <thead>
            <tr className="h-10">
              <th className="w-14 p-6 col-span-1"><FaTh /></th>
              <th className="text-left p-5 col-span-7">चलानी सूचीकरण</th>
              <th className="col-span-1 ml-5">
                <button onClick={handlePrint} className="bg-green-600 text-white text-xs p-2 rounded-md">Print</button>
              </th>
            </tr>
          </thead>
        </table>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-slate-300">
                <th className="border px-4 py-2">क्र.स.</th>
                <th className="border px-4 py-2">विषय (Subject)</th>
                <th className="border px-4 py-2">प्राप्तकर्ता को नाम(Receiver)</th>
                <th className="border px-4 py-2">पठाइएको मिति (Sent Date)</th>
                <th className="border px-4 py-2">कागजात प्रकार (Document Type)</th>
                <th className="border px-4 py-2">स्थिति (Status)</th>
                <th className="border px-4 py-2">सम्बन्धित कार्यालय (Related Office)</th>
                <th className="border px-4 py-2">कार्य</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="border px-4 py-2 text-center">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="8" className="border px-4 py-2 text-center text-red-500">{error}</td>
                </tr>
              ) : currentRows.length > 0 ? (
                currentRows.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                    <td className="border px-4 py-2">{item.subject || 'N/A'}</td>
                    <td className="border px-4 py-2">{item.receiver_name || 'N/A'}</td>
                    <td className="border px-4 py-2">{item.sent_date || 'N/A'}</td>
                    <td className="border px-4 py-2">{item.document_type || 'N/A'}</td>
                    <td className="border px-4 py-2">{item.status || 'N/A'}</td>
                    <td className="border px-4 py-2">{item.related_office || 'N/A'}</td>
                    <td className=" px-20 py-2 flex">
                      {item.document_file ? (
                        <a href={item.document_file} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                          <button className="bg-blue-500 text-white font-bold p-1">View</button>

                        </a>
                      ) : (
                        <button className="bg-yellow-500 text-white font-bold p-1">View</button>
                      )}
                      <button className="bg-green-500 text-white font-bold p-1 ml-2">Done</button>
                      <Link to={`/deleteChalani/${item.id}`}>
                        <button className="bg-red-500 text-white font-bold p-1 ml-2">
                          Delete
                        </button>
                      </Link>                        
                      </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2 text-center" colSpan="8">कुनै रेकर्ड फेला परेन (No Records Found)</td>
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
          {Array.from({ length: totalPages }, (_, i) => {
            const startPage = Math.max(1, currentPage - 1);
            const endPage = Math.min(totalPages, currentPage + 1);

            if (i + 1 >= startPage && i + 1 <= endPage) {
              return (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`py-1 px-3 ml-2 rounded-lg font-bold ${currentPage === i + 1 ? 'bg-cyan-500 text-white' : ' hover:bg-gray-400'}`}
                >
                  {i + 1}
                </button>
              );
            }
            return null;
          })}

          <button
            className={`text-gray-400 font-bold py-1 px-3 ml-2 rounded-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chalani;
